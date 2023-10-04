import mongoose from 'mongoose';

const DivisionSchema = new mongoose.Schema(
    {
        divisionNumber: { type: Number, required: true }, // номер подразделения
        name: { type: String, required: true }, // название подразделения
        staff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // сотрудники
        submitApplications: { type: Number, required: true }, // кол-во отправленных заявок
        agreedApplications: { type: Number, required: true } // кол-во подтвержденных заявок
    },
    { timestamps: true }
);

export const DivisionModel = mongoose.model('Vacation', DivisionSchema);
