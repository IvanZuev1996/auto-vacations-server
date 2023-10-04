import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true }, // имя
        lastname: { type: String, required: true }, // фамилия
        patronymic: { type: String, required: true }, // отчество
        avatar: { type: String, required: true }, // аватарка
        email: { type: String, required: true }, // почта
        post: { type: String, required: true }, // должность
        role: { type: String, required: true }, // роль пользователя: Руководитель/Сотрудник
        department: { type: Number, required: true }, // отдел
        division: { type: Number, required: true }, // подразделение
        intersections: { type: [String], required: true }, // пересечения
        startWork: { type: Date, required: true }, // дата начала работы
        vacations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vacation' }], // отпуска
        balance: { type: Number, required: true }, // баланс отпускных дней
        daysOnVacations: { type: Number, required: true }, // кол-во дней проведенных в отпуске
        visibleUsers: { type: String, required: true }, // доступные для просмотра пользователи
        vacationStatus: { type: String, required: true }, // статус 'в отпуске' или 'работает'
        auth: {
            username: { type: String, required: true },
            password: { type: String, required: true, select: false },
            salt: { type: String, select: false },
            sessionToken: { type: String, select: false }
        }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByFullName = (
    firstname: string,
    lastname: string,
    patronymic: string,
    division: string
) => UserModel.findOne({ firstname, lastname, patronymic, division });
export const getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
    new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
    UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values);
