import { UserModel } from './User';
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email) => UserModel.findOne({ email });
export const getUsersByDivision = (divisionId) => UserModel.find({ division: divisionId });
export const getUserByUsername = (username) => UserModel.findOne({ 'auth.username': username });
export const getUserByFullName = (firstname, lastname, division, patronymic) => UserModel.findOne({ firstname, lastname, division, patronymic });
export const getUserBySessionToken = (sessionToken) => UserModel.findOne({ 'auth.sessionToken': sessionToken });
export const getUserById = (id) => UserModel.findById(id);
export const createUser = (values) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id, data) => UserModel.findByIdAndUpdate(id, {
    $set: data
}, { new: true });
