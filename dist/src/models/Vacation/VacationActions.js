import { VacationModel } from './Vacation';
export const getVacations = () => VacationModel.find();
export const getVacationsByUserId = (userId) => VacationModel.find({ userId });
export const getVacationsByStatus = (status) => VacationModel.find({ status });
export const getVacationsByType = (type) => VacationModel.find({ type });
export const getVacationById = (id) => VacationModel.findById(id);
export const createVacation = (values) => new VacationModel(values).save().then((vacation) => vacation.toObject());
export const deleteVacationById = (id) => VacationModel.findOneAndDelete({ _id: id });
export const updateVacationById = (id, data) => VacationModel.findByIdAndUpdate(id, {
    $set: data
}, { new: true });
