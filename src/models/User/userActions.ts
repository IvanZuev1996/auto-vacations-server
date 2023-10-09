import { User } from 'src/types/user';
import { UserModel } from './User';
import { Division } from 'src/types/division';

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUsersByDivision = (divisionId: string) =>
    UserModel.find({ 'division._id': divisionId });

export const getUserByUsername = (username: string) =>
    UserModel.findOne({ 'auth.username': username });

export const getUserByFullName = (
    firstname: string,
    lastname: string,
    division: Division,
    patronymic?: string
) => UserModel.findOne({ firstname, lastname, division, patronymic });

export const getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ 'auth.sessionToken': sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
    new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
    UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, data: User) =>
    UserModel.findByIdAndUpdate(
        id,
        {
            $set: data
        },
        { new: true }
    );
