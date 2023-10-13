import { Document, Schema } from 'mongoose';

export interface Division extends Document {
    divisionNumber: number; // номер подразделения
    name: string; // название подразделения
    submitApplications: number; // кол-во отправленных заявок
    agreedApplications: number; // кол-во подтвержденных заявок
}
