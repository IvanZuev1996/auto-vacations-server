import mongoose from 'mongoose';
import { Division } from '../../types/division';

const DivisionSchema = new mongoose.Schema<Division>(
    {
        divisionNumber: { type: Number, required: true }, // номер подразделения
        name: { type: String, required: true }, // название подразделения
        submitApplications: { type: Number, required: true }, // кол-во отправленных заявок
        agreedApplications: { type: Number, required: true } // кол-во подтвержденных заявок
    },
    { timestamps: true }
);

export const DivisionModel = mongoose.model<Division>(
    'Division',
    DivisionSchema
);
