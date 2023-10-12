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
        return res.sendStatus(400);
    }
};

export const getAllUsers = async (
    req: Request<{}, {}, {}, GetAllUsersParams>,
    res: Response
) => {
    try {
        const { search, sort } = req.query;
        const searchTerms = search?.split(' ');

        const searchQueries = searchTerms?.map((term) => ({
            $or: [
                { firstname: new RegExp(term, 'i') },
                { lastname: new RegExp(term, 'i') },
                { patronymic: new RegExp(term, 'i') }
            ]
        }));

        let users;

        if (search && sort !== 'all') {
            users = await UserModel.find({
                vacationStatus: sort,
                $and: searchQueries
            });

            return res.status(200).json(users);
        }

        if (sort !== 'all' && !search) {
            users = await UserModel.find({
                vacationStatus: sort
            });

            return res.status(200).json(users);
        }

        if (search) {
            users = await UserModel.find({
                $and: searchQueries
            });

            return res.status(200).json(users);
        }

        users = await UserModel.find();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const createUser = async (req: Request<{}, {}, User>, res: Response) => {
    const newUser = new UserModel(req.body);

    try {
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
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
        return res.sendStatus(400);
    }
};
