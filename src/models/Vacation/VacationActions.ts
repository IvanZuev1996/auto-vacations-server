import { Vacation, VacationStatus, VacationTypes } from 'src/types/vacation';
import { VacationModel } from './Vacation';

export const getVacations = () => VacationModel.find();

export const getVacationsByUserId = (userId: string) =>
    VacationModel.find({ userId });
export const getVacationsByStatus = (status: VacationStatus) =>
    VacationModel.find({ status });
export const getVacationsByType = (type: VacationTypes) =>
    VacationModel.find({ type });
export const getUserById = (id: string) => VacationModel.findById(id);

export const createVacation = (values: Record<string, any>) =>
    new VacationModel(values).save().then((vacation) => vacation.toObject());

export const deleteVacationById = (id: string) =>
    VacationModel.findOneAndDelete({ _id: id });

export const updateVacationById = (id: string, data: Vacation) =>
    VacationModel.findByIdAndUpdate(
        id,
        {
            $set: data
        },
        { new: true }
    );
