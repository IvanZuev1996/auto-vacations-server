import { Document, Schema } from 'mongoose';

interface AuthData {
    username: string;
    password: string;
    salt: string;
    sessionToken: string;
    testPassword: string;
}

export type UserAuthData = Omit<AuthData, 'salt' | 'sessionToken'>;

export type UserRole = 'director' | 'employee';

export interface User extends Document {
    firstname: string; // имя
    lastname: string; // фамилия
    patronymic?: string; // отчество
    avatar?: string; // аватарка
    email?: string; // почта
    post?: string; // должность
    role: UserRole; // роль пользователя: Руководитель/Сотрудник
    department?: number; // отдел
    division: number; // подразделение
    intersections?: string[]; // пересечения
    startWork?: Schema.Types.Date; // дата начала работы
    vacations: [Schema.Types.ObjectId]; // отпуска
    balance: number; // баланс отпускных дней
    daysOnVacations: number; // кол-во дней проведенных в отпуске
    visibleUsers: string[]; // доступные для просмотра пользователи
    vacationStatus: 'in vacation' | 'work'; // статус 'в отпуске' или 'работает'
    auth: AuthData;
}
