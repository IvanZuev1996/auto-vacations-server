import { Document, Schema } from 'mongoose';

export type VacationStatus = 'pending' | 'rejected' | 'agreed';
export type VacationTypes = 'standart';

export interface Vacation extends Document {
    userId: string; // id пользователя
    start: Date; // дата начала отпуска
    end: Date; // дата конца отпуска
    type: VacationTypes; // тип отпуска
    status: VacationStatus; // статус заявки
}
