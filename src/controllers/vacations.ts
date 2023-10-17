import { Request, Response } from 'express';
import {
    deleteVacationById,
    getVacationById,
    getVacations,
    updateVacationById
} from '../models/Vacation/VacationActions';
import { Vacation, VacationStatus, VacationTypes } from '../types/vacation';
import { VacationModel } from '../models/Vacation/Vacation';

import dayjs from 'dayjs';
import { UserModel } from '../models/User/User';

interface ReqQuery {
    month?: number;
    year?: number;
    type?: VacationTypes;
    status?: VacationStatus;
    userId?: string;
}

export const getOneVacationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vacation = await getVacationById(id).populate('user');
        return res.status(200).json(vacation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailGetOneVacationById',
            message: 'Ошибка при получении отпуска по ID'
        });
    }
};

// export const getAllVacations = async (
//     req: Request<{}, {}, {}, { division: string }>,
//     res: Response
// ) => {
//     const { division } = req.query;

//     try {
//         let aggregationPipeline: any[] = [];

//         if (division) {
//             const userIds = await UserModel.find({ division }).distinct('_id');
//             aggregationPipeline.push({
//                 $match: {
//                     user: { $in: userIds }
//                 }
//             });
//         }

//         aggregationPipeline.push(
//             {
//                 $group: {
//                     _id: '$user', // Группируем по полю user (userId)
//                     userVacations: { $push: '$$ROOT' } // Собираем отпуска пользователя в массив userVacations
//                 }
//             },
//             {
//                 $project: {
//                     userData: '$_id', // Создаем поле userId на основе _id
//                     userVacations: 1, // Оставляем поле userVacations
//                     _id: 0 // Убираем поле _id
//                 }
//             },
//             {
//                 $sort: {
//                     'userData.lastname': 1 // Сортировка по фамилии (в алфавитном порядке)
//                 }
//             }
//         );

//         const vacations = await VacationModel.aggregate(aggregationPipeline);

//         await VacationModel.populate(vacations, {
//             path: 'userData',
//             model: 'User'
//         });

//         vacations.sort((a, b) =>
//             a.userData.lastname.localeCompare(b.userData.lastname, 'ru')
//         );

//         return res.status(200).json(vacations);
//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(400).send({
//             status: 'FailGetAllVacations',
//             message: 'Ошибка при получении всех отпусков'
//         });
//     }
// };

export const getAllVacations = async (
    req: Request<{}, {}, {}, { division: string }>,
    res: Response
) => {
    const { division } = req.query;

    try {
        let aggregationPipeline: any[] = [];

        if (division !== 'all') {
            const userIds = await UserModel.find({ division }).distinct('_id');
            aggregationPipeline.push({
                $match: {
                    user: { $in: userIds }
                }
            });
        }

        aggregationPipeline.push(
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userData'
                }
            },
            {
                $unwind: '$userData'
            },
            {
                $sort: {
                    'userData.division': 1, // Сортировка по division
                    'userData.lastname': 1, // Сортировка по lastname
                    user: 1 // Сортировка по пользователю (user)
                }
            },
            {
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
            },
            {
                $group: {
                    _id: '$_id.division',
                    vacations: {
                        $push: {
                            userVacations: '$userVacations',
                            userData: '$userData'
                        }
                    }
                }
            },
            {
                $project: {
                    vacations: 1,
                    division: '$_id',
                    _id: 0
                }
            },
            {
                $sort: {
                    division: 1 // Сортировка по division
                }
            }
        );

        const allVacations = await VacationModel.aggregate(aggregationPipeline);

        await VacationModel.populate(allVacations, {
            path: 'vacations.userData',
            model: 'User'
        });

        await VacationModel.populate(allVacations, {
            path: 'division',
            model: 'Division'
        });

        allVacations.forEach((division: any) => {
            division.vacations.sort((a: any, b: any) =>
                a.userData.lastname.localeCompare(b.userData.lastname, 'ru')
            );
        });

        return res.status(200).json(allVacations);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailGetAllVacations',
            message: 'Ошибка при получении всех отпусков'
        });
    }
};

export const createVacation = async (
    req: Request<{}, {}, Vacation>,
    res: Response
) => {
    const { start, end } = req.body;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const newVacation = new VacationModel({
        ...req.body,
        start: startDate,
        end: endDate
    });

    try {
        const savedVacation = await newVacation.save();
        return res.status(200).json(savedVacation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailCreateVacation',
            message: 'Ошибка при создании отпуска'
        });
    }
};

export const deleteVacation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedVacation = await deleteVacationById(id);

        return res.json(deletedVacation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailDeleteVacation',
            message: 'Ошибка при удалении отпуска'
        });
    }
};

export const updateVacation = async (
    req: Request<{ id: string }, {}, Vacation>,
    res: Response
) => {
    try {
        const { id } = req.params;

        const vacation = await updateVacationById(id, req.body);

        return res.status(200).json(vacation).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailUpdateVacation',
            message: 'Ошибка при обновлении отпуска'
        });
    }
};
