import { Document, ObjectId, Types } from 'mongoose';

export type VacationStatus = 'pending' | 'rejected' | 'agreed';
export type VacationTypes = 'standart' | 'donor';

export const vacationTypeMap: Record<VacationTypes, string> = {
    donor: 'Донорский',
    standart: 'Ежегодный оплачиваемый'
};

export interface Vacation extends Document {
    user: Types.ObjectId; // id пользователя
    start: Date; // дата начала отпуска
    end: Date; // дата конца отпуска
    type: VacationTypes; // тип отпуска
    status: VacationStatus; // статус заявки
    createdAt: Date;
    updatedAt: Date;
}
