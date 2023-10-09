import express from 'express';
import {
    createDivision,
    deleteDivision,
    getAllDivisions,
    updateDivision
} from '../controllers/divisions';

export default (router: express.Router) => {
    router.get('/divisions', getAllDivisions);
    router.post('/divisions', createDivision);
    router.delete('/divisions/:id', deleteDivision);
    router.patch('/divisions/:id', updateDivision);
};
