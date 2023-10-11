import mongoose from 'mongoose';
import { Vacation } from '../../types/vacation';

const VacationSchema = new mongoose.Schema<Vacation>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // id пользователя
        start: { type: Date, required: true }, // дата начала отпуска
        end: { type: Date, required: true }, // дата конца отпуска
        type: { type: String, required: true }, // тип отпуска
        status: { type: String, required: true }, // статус заявки,
        updatedAt: { type: Date, required: true },
        createdAt: { type: Date, required: true }
    },
    { timestamps: true }
);

export const VacationModel = mongoose.model<Vacation>(
    'Vacation',
    VacationSchema
);
