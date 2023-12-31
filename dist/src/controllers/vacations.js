import { deleteVacationById, getUserVacationsById, getVacationById, updateVacationById } from '../models/Vacation/VacationActions';
import { VacationModel } from '../models/Vacation/Vacation';
import { UserModel } from '../models/User/User';
import { getUserById } from '../models/User/userActions';
import { getVacaionDaysCount } from '../helpers/dates';
import { isUserInVacation } from '../helpers/vacation';
import { sendAddedVacationEmail } from '../emailMessages/addedVacation';
export const getOneVacationById = async (req, res) => {
    const { id } = req.params;
    try {
        const vacation = await getVacationById(id).populate('user');
        return res.status(200).json(vacation);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailGetOneVacationById',
            message: 'Ошибка при получении отпуска по ID'
        });
    }
};
export const getAllVacations = async (req, res) => {
    const { division, userId } = req.query;
    try {
        if (userId) {
            const userVacations = await getUserVacationsById(userId)
                .sort({ createdAt: -1 })
                .exec();
            return res.status(200).json(userVacations);
        }
        let aggregationPipeline = [];
        // aggregationPipeline.push({
        //     $match: {
        //         status: 'agreed'
        //     }
        // });
        if (division !== 'all') {
            const userIds = await UserModel.find({ division }).distinct('_id');
            aggregationPipeline.push({
                $match: {
                    user: { $in: userIds }
                }
            });
        }
        aggregationPipeline.push({
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userData'
            }
        }, {
            $unwind: '$userData'
        }, {
            $sort: {
                'userData.division': 1,
                'userData.lastname': 1,
                user: 1 // Сортировка по пользователю (user)
            }
        }, {
            $group: {
                _id: {
                    division: '$userData.division',
                    user: '$user'
                },
                userVacations: {
                    $push: {
                        _id: '$_id',
                        start: '$start',
                        end: '$end',
                        type: '$type',
                        status: '$status',
                        createdAt: '$createdAt',
                        updatedAt: '$updatedAt',
                        __v: '$__v'
                    }
                },
                userData: { $first: '$userData' } // Выбираем первое значение userData (для каждого пользователя)
            }
        }, {
            $group: {
                _id: '$_id.division',
                vacations: {
                    $push: {
                        userVacations: '$userVacations',
                        userData: '$userData'
                    }
                }
            }
        }, {
            $project: {
                vacations: 1,
                division: '$_id',
                _id: 0
            }
        }, {
            $sort: {
                division: 1 // Сортировка по division
            }
        });
        const allVacations = await VacationModel.aggregate(aggregationPipeline);
        await VacationModel.populate(allVacations, {
            path: 'vacations.userData',
            model: 'User'
        });
        await VacationModel.populate(allVacations, {
            path: 'division',
            model: 'Division'
        });
        allVacations.forEach((division) => {
            division.vacations.sort((a, b) => a.userData.lastname.localeCompare(b.userData.lastname, 'ru'));
        });
        return res.status(200).json(allVacations);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailGetAllVacations',
            message: 'Ошибка при получении всех отпусков'
        });
    }
};
export const createVacation = async (req, res) => {
    const { start, end, user } = req.body;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const newVacation = new VacationModel({
        ...req.body,
        start: startDate,
        end: endDate,
        status: 'pending'
    });
    const daysCount = getVacaionDaysCount(start, end);
    const userFromDB = await getUserById(user.toString());
    try {
        const savedVacation = await newVacation.save();
        if (userFromDB) {
            if (userFromDB?.balance) {
                userFromDB.balance = userFromDB.balance - daysCount;
                userFromDB.spentVacationDays =
                    userFromDB.spentVacationDays + daysCount;
            }
            if (userFromDB.vacationsDuration) {
                userFromDB.vacationsDuration?.push(daysCount);
            }
            else {
                userFromDB.vacationsDuration = [daysCount];
            }
            await userFromDB.save();
        }
        sendAddedVacationEmail(savedVacation);
        return res.status(200).json(savedVacation);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailCreateVacation',
            message: 'Ошибка при создании отпуска'
        });
    }
};
export const deleteVacation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVacation = await deleteVacationById(id);
        if (deletedVacation) {
            const daysCount = getVacaionDaysCount(deletedVacation.start, deletedVacation.end);
            const userFromDB = await getUserById(deletedVacation.user.toString());
            if (userFromDB) {
                userFromDB.balance = userFromDB.balance + daysCount;
                userFromDB.spentVacationDays =
                    userFromDB.spentVacationDays - daysCount;
                if (isUserInVacation(deletedVacation)) {
                    userFromDB.nowInVacation = false;
                }
                const index = userFromDB.vacationsDuration?.findIndex((item) => item === daysCount);
                if (index !== undefined) {
                    userFromDB.vacationsDuration?.splice(index, 1);
                }
                await userFromDB.save();
            }
        }
        return res.json(deletedVacation);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailDeleteVacation',
            message: 'Ошибка при удалении отпуска'
        });
    }
};
export const updateVacation = async (req, res) => {
    try {
        const { id } = req.params;
        const oldVacation = await getVacationById(id);
        const vacation = await updateVacationById(id, req.body);
        if (vacation) {
            const userFromDB = await getUserById(vacation.user.toString());
            if (userFromDB) {
                if (oldVacation) {
                    const oldDaysCount = getVacaionDaysCount(oldVacation.start, oldVacation.end);
                    const newDaysCount = getVacaionDaysCount(vacation.start, vacation.end);
                    const index = userFromDB?.vacationsDuration?.findIndex((item) => item === oldDaysCount);
                    if (index && userFromDB.vacationsDuration) {
                        userFromDB.vacationsDuration[index] = newDaysCount;
                    }
                    if (oldDaysCount < newDaysCount) {
                        userFromDB.balance =
                            userFromDB.balance - newDaysCount - oldDaysCount;
                    }
                    if (oldDaysCount > newDaysCount) {
                        userFromDB.balance =
                            userFromDB.balance + oldDaysCount - newDaysCount;
                    }
                }
                if (vacation?.status === 'agreed') {
                    if (isUserInVacation(vacation)) {
                        userFromDB.nowInVacation = true;
                    }
                }
                await userFromDB.save();
            }
        }
        return res.status(200).json(vacation).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailUpdateVacation',
            message: 'Ошибка при обновлении отпуска'
        });
    }
};
