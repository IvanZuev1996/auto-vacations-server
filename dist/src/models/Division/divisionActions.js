import { DivisionModel } from './Division';
export const getDivisions = () => DivisionModel.find();
export const getDivisionByNumber = (divisionNumber) => DivisionModel.findOne({ divisionNumber });
export const getOneDivisionById = (id) => DivisionModel.findById(id);
export const createDivision = (values) => new DivisionModel(values).save().then((division) => division.toObject());
export const deleteDivisionById = (id) => DivisionModel.findOneAndDelete({ _id: id });
export const updateDivisionById = (id, data) => DivisionModel.findByIdAndUpdate(id, {
    $set: data
}, { new: true });
