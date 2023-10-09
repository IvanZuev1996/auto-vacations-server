import express from 'express';
import {
    createVacation,
    deleteVacation,
    getAllVacations,
    updateVacation,
    getOneVacationById
} from '../controllers/vacations';

export default (router: express.Router) => {
    router.get('/vacations', getAllVacations);
    router.post('/vacations', createVacation);
    router.get('/vacations/:id', getOneVacationById);
    router.delete('/vacations/:id', deleteVacation);
    router.patch('/vacations/:id', updateVacation);
};
