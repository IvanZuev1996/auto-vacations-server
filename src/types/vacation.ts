import { Document, Schema } from 'mongoose';

export type vacationStatus = 'pending' | 'rejected' | 'agreed';

export interface Vacation extends Document {
    userId: string; // id пользователя
    start: Schema.Types.Date; // дата начала отпуска
    end: Schema.Types.Date; // дата конца отпуска
    type: Schema.Types.Date; // тип отпуска
    status: vacationStatus; // статус заявки
}
