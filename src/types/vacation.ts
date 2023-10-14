import { Document } from 'mongoose';
import { User } from './user';

export type VacationStatus = 'pending' | 'rejected' | 'agreed';
export type VacationTypes = 'standart';

export interface Vacation extends Document {
    user: User; // id пользователя
    start: Date; // дата начала отпуска
    end: Date; // дата конца отпуска
    type: VacationTypes; // тип отпуска
    status: VacationStatus; // статус заявки
    createdAt: Date;
    updatedAt: Date;
}
