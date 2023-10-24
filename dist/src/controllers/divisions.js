import { DivisionModel } from '../models/Division/Division';
import { deleteDivisionById, getDivisions, updateDivisionById, getOneDivisionById } from '../models/Division/divisionActions';
import { getUsersByDivision } from '../models/User/userActions';
import { getUserVacationsById } from '../models/Vacation/VacationActions';
import dayjs from 'dayjs';
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
export const getDivisionStatistics = async (req, res) => {
    try {
        const { id } = req.params;
        const today = dayjs();
        const division = await getOneDivisionById(id);
        const divisionUsers = await getUsersByDivision(id);
        let inVacationUsersCount = 0;
        console.log(divisionUsers);
        for (const user of divisionUsers) {
            const userVacations = await getUserVacationsById(user._id);
            for (const vacation of userVacations) {
                const startDate = dayjs(vacation.start);
                const endDate = dayjs(vacation.end).add(1, 'day');
                if (today.isBetween(startDate, endDate, null, '[]')) {
                    inVacationUsersCount += 1;
                }
            }
        }
        return res.status(200).json({ inVacationUsersCount });
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
