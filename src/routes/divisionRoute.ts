import express from 'express';
import {
    createDivision,
    deleteDivision,
    getAllDivisions,
    updateDivision,
    getDivisionById,
    getDivisionStatistics
} from '../controllers/divisions';

export default (router: express.Router) => {
    router.get('/divisions', getAllDivisions);
    router.get('/divisions/statistics/:id', getDivisionStatistics);
    router.post('/divisions', createDivision);
    router.get('/divisions/:id', getDivisionById);
    router.delete('/divisions/:id', deleteDivision);
    router.patch('/divisions/:id', updateDivision);
};
