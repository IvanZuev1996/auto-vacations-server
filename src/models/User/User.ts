import mongoose from 'mongoose';
import { User } from '../../types/user';

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
        division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' }, // подразделение
        intersections: { type: [String], required: true }, // пересечения
        startWork: { type: Date }, // дата начала работы
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
