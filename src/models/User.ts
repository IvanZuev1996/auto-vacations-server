import mongoose from 'mongoose';
import { User } from '../types/user';

export const UserSchema = new mongoose.Schema<User>(
    {
        firstname: { type: String, required: true }, // имя
        lastname: { type: String, required: true }, // фамилия
        patronymic: { type: String }, // отчество
        avatar: { type: String }, // аватарка
        email: { type: String }, // почта
        post: { type: String }, // должность
        role: { type: String, required: true }, // роль пользователя: Руководитель/Сотрудник
        department: { type: Number }, // отдел
        division: { type: Number, required: true }, // подразделение
        intersections: { type: [String], required: true }, // пересечения
        startWork: { type: Date }, // дата начала работы
        vacations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vacation' }], // отпуска
        balance: { type: Number, required: true }, // баланс отпускных дней
        daysOnVacations: { type: Number }, // кол-во дней проведенных в отпуске
        visibleUsers: { type: [String] }, // доступные для просмотра пользователи
        vacationStatus: { type: String }, // статус 'в отпуске' или 'работает'
        auth: {
            username: { type: String, required: true },
            password: { type: String, required: true, select: false },
            salt: { type: String, select: false },
            sessionToken: { type: String, select: false },
            testPassword: { type: String, select: false }
        }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<User>('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByUsername = (username: string) =>
    UserModel.findOne({ 'auth.username': username });
export const getUserByFullName = (
    firstname: string,
    lastname: string,
    division: number,
    patronymic?: string
) => UserModel.findOne({ firstname, lastname, division, patronymic });
export const getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
    new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
    UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values);
