import { Request, Response } from 'express';
import {
    deleteVacationById,
    getVacationById,
    updateVacationById
} from '../models/Vacation/VacationActions';
import { Vacation, VacationStatus, VacationTypes } from '../types/vacation';
import { VacationModel } from '../models/Vacation/Vacation';

import dayjs from 'dayjs';

interface ReqQuery {
    month?: number;
    year?: number;
    type?: VacationTypes;
    status?: VacationStatus;
    userId?: string;
}

export const getOneVacationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vacation = await getVacationById(id).populate('user');
        return res.status(200).json(vacation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getVacationListByUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vacation = await getVacationById(id).populate('user');
        return res.status(200).json(vacation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getAllVacations = async (
    req: Request<{}, {}, {}, ReqQuery>,
    res: Response
) => {
    try {
        const { month, year } = req.query;
        const query: { [key: string]: any } = {
            ...req.query,
            year: undefined,
            month: undefined
        };

        Object.keys(query).forEach((key) => !query[key] && delete query[key]);

        let vacations;

        if (year && month) {
            const startDate = new Date(`${year}-${month}-01`);
            const days = dayjs(`${year}-${month}`).daysInMonth();
            const endDate = new Date(`${year}-${month}-${days}`);

            vacations = await VacationModel.find({
                ...query,
                start: {
                    $gte: startDate,
                    $lte: endDate
                },
                end: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('user');
        } else if (year && !month) {
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);

            vacations = await VacationModel.find({
                ...query,
                start: {
                    $gte: startDate,
                    $lte: endDate
                },
                end: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('user');
        } else {
            vacations = await VacationModel.find(query).populate('user');
        }

        return res.status(200).json(vacations);
    } catch (error) {
        return res.sendStatus(400);
    }
};

export const createVacation = async (
    req: Request<{}, {}, Vacation>,
    res: Response
) => {
    const { start, end } = req.body;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const newVacation = new VacationModel({
        ...req.body,
        start: startDate,
        end: endDate
    });

    try {
        const savedVacation = await newVacation.save();
        return res.status(200).json(savedVacation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteVacation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedVacation = await deleteVacationById(id);

        return res.json(deletedVacation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateVacation = async (
    req: Request<{ id: string }, {}, Vacation>,
    res: Response
) => {
    try {
        const { id } = req.params;

        const vacation = await updateVacationById(id, req.body);

        return res.status(200).json(vacation).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
