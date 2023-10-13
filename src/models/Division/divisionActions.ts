import { DivisionModel } from './Division';
import { Division } from '../../types/division';

export const getDivisions = () => DivisionModel.find();

export const getDivisionByNumber = (divisionNumber: string) =>
    DivisionModel.findOne({ divisionNumber });

export const getOneDivisionById = (id: string) => DivisionModel.findById(id);

export const createDivision = (values: Record<string, any>) =>
    new DivisionModel(values).save().then((division) => division.toObject());

export const deleteDivisionById = (id: string) =>
    DivisionModel.findOneAndDelete({ _id: id });

export const updateDivisionById = (id: string, data: Division) =>
    DivisionModel.findByIdAndUpdate(
        id,
        {
            $set: data
        },
        { new: true }
    );
