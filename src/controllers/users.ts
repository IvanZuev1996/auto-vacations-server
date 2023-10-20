import { Request, Response } from 'express';

import {
    deleteUserById,
    getUserById,
    updateUserById
} from '../models/User/userActions';
import { GetAllUsersParams, User } from '../types/user';
import { UserModel } from '../models/User/User';

interface UsersReqQuery {
    divisionId?: string;
}

export const getOneUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailgetOneUserById',
            message: 'Ошибка при получении пользователя по ID'
        });
    }
};

export const getAllUsers = async (
    req: Request<{}, {}, {}, GetAllUsersParams>,
    res: Response
) => {
    try {
        const { search, sort, division } = req.query;
        const searchTerms = search?.split(' ');

        const searchQueries = searchTerms?.map((term) => ({
            $or: [
                { firstname: new RegExp(term, 'i') },
                { lastname: new RegExp(term, 'i') },
                { patronymic: new RegExp(term, 'i') }
            ]
        }));

        let query: any = {};

        if (sort !== 'all' && sort) {
            query.vacationStatus = sort;
        }

        if (searchQueries) {
            query.$and = searchQueries;
        }

        if (division !== 'all' && division) {
            query.division = division;
        }

        const users = await UserModel.find(query);

        users.sort((a: User, b: User) => {
            const lastNameA = a.lastname.toLowerCase();
            const lastNameB = b.lastname.toLowerCase();

            if (lastNameA < lastNameB) {
                return -1;
            } else if (lastNameA > lastNameB) {
                return 1;
            }

            return 0;
        });

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailgetAllUsers',
            message: 'Ошибка при получении пользователей'
        });
    }
};

export const createUser = async (req: Request<{}, {}, User>, res: Response) => {
    const newUser = new UserModel(req.body);

    try {
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailCreateUser',
            message: 'Ошибка при создании пользователя'
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailDeleteUser',
            message: 'Ошибка при удалении пользоваетеля'
        });
    }
};

export const updateUser = async (
    req: Request<{ id: string }, {}, User>,
    res: Response
) => {
    try {
        const { id } = req.params;

        const user = await updateUserById(id, req.body);

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailupdateUser',
            message: 'Ошибка при обновлении данных пользователя'
        });
    }
};
