import { Request, Response } from 'express';
import { DivisionModel } from '../models/Division/Division';
import {
    deleteDivisionById,
    getDivisions,
    updateDivisionById,
    getOneDivisionById
} from '../models/Division/divisionActions';
import { Division } from 'src/types/division';

export const getDivisionById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;
        const division = await getOneDivisionById(id);

        return res.status(200).json(division);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getAllDivisions = async (req: Request, res: Response) => {
    try {
        const divisions = await getDivisions();

        return res.status(200).json(divisions);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'NotAllDivisions',
            message: 'Ошибка при получении всех подразделений'
        });
    }
};

export const createDivision = async (
    req: Request<{}, {}, Division>,
    res: Response
) => {
    const newDivision = new DivisionModel(req.body);

    try {
        const savedDivision = await newDivision.save();
        return res.status(200).json(savedDivision);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'NotCreateDivision',
            message: 'Ошибка при создании подразделения'
        });
    }
};

export const deleteDivision = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedDivision = await deleteDivisionById(id);

        return res.json(deletedDivision);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'NotDeleteDivision',
            message: 'Ошибка при удалении подразделения'
        });
    }
};

export const updateDivision = async (
    req: Request<{ id: string }, {}, Division>,
    res: Response
) => {
    try {
        const { id } = req.params;

        const division = await updateDivisionById(id, req.body);

        return res.status(200).json(division).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send({
            status: 'NotUpdateDivision',
            message: 'Ошибка при обновлении подразделения'
        });
    }
};
