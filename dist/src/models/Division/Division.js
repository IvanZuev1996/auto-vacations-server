import mongoose from 'mongoose';
const DivisionSchema = new mongoose.Schema({
    divisionNumber: { type: Number, required: true },
    name: { type: String, required: true },
    submitApplications: { type: Number, required: true },
    agreedApplications: { type: Number, required: true } // кол-во подтвержденных заявок
}, { timestamps: true });
export const DivisionModel = mongoose.model('Division', DivisionSchema);
