import { deleteVacationById, getVacationById, updateVacationById } from '../models/Vacation/VacationActions';
import { VacationModel } from '../models/Vacation/Vacation';
import { UserModel } from '../models/User/User';
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
    const { division } = req.query;
    try {
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
    const { start, end } = req.body;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const newVacation = new VacationModel({
        ...req.body,
        start: startDate,
        end: endDate,
        status: 'pending'
    });
    try {
        const savedVacation = await newVacation.save();
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
        const vacation = await updateVacationById(id, req.body);
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
