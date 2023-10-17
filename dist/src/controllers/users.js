import { deleteUserById, getUserById, updateUserById } from '../models/User/userActions';
import { UserModel } from '../models/User/User';
export const getOneUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailgetOneUserById',
            message: 'Ошибка при получении пользователя по ID'
        });
    }
};
export const getAllUsers = async (req, res) => {
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
        let query = {};
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
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailgetAllUsers',
            message: 'Ошибка при получении пользователей'
        });
    }
};
export const createUser = async (req, res) => {
    const newUser = new UserModel(req.body);
    try {
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailCreateUser',
            message: 'Ошибка при создании пользователя'
        });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailDeleteUser',
            message: 'Ошибка при удалении пользоваетеля'
        });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await updateUserById(id, req.body);
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'FailupdateUser',
            message: 'Ошибка при обновлении данных пользователя'
        });
    }
};
