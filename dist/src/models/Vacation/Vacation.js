import mongoose from 'mongoose';
const VacationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true } // статус заявки
}, { timestamps: true });
export const VacationModel = mongoose.model('Vacation', VacationSchema);
