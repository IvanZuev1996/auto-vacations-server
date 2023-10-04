import mongoose from 'mongoose';

const VacationSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true }, // id пользователя
        start: { type: Date, required: true }, // дата начала отпуска
        end: { type: Date, required: true }, // дата конца отпуска
        type: { type: Date, required: true }, // тип отпуска
        status: { type: String, required: true } // статус заявки
    },
    { timestamps: true }
);

export const VacationModel = mongoose.model('Vacation', VacationSchema);
