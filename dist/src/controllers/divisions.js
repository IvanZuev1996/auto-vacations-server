import { DivisionModel } from '../models/Division/Division';
import { deleteDivisionById, getDivisions, updateDivisionById, getOneDivisionById } from '../models/Division/divisionActions';
export const getDivisionById = async (req, res) => {
    try {
        const { id } = req.params;
        const division = await getOneDivisionById(id);
        return res.status(200).json(division);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const getAllDivisions = async (req, res) => {
    try {
        const divisions = await getDivisions();
        return res.status(200).json(divisions);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'NotAllDivisions',
            message: 'Ошибка при получении всех подразделений'
        });
    }
};
export const createDivision = async (req, res) => {
    const newDivision = new DivisionModel({
        ...req.body,
        agreedApplications: 0,
        submitApplications: 0
    });
    try {
        const savedDivision = await newDivision.save();
        return res.status(200).json(savedDivision);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'NotCreateDivision',
            message: 'Ошибка при создании подразделения'
        });
    }
};
export const deleteDivision = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDivision = await deleteDivisionById(id);
        return res.json(deletedDivision);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'NotDeleteDivision',
            message: 'Ошибка при удалении подразделения'
        });
    }
};
export const updateDivision = async (req, res) => {
    try {
        const { id } = req.params;
        const division = await updateDivisionById(id, req.body);
        return res.status(200).json(division).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'NotUpdateDivision',
            message: 'Ошибка при обновлении подразделения'
        });
    }
};
