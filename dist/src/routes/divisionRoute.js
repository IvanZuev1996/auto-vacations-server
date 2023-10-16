import { createDivision, deleteDivision, getAllDivisions, updateDivision, getDivisionById } from '../controllers/divisions';
export default (router) => {
    router.get('/divisions', getAllDivisions);
    router.post('/divisions', createDivision);
    router.get('/divisions/:id', getDivisionById);
    router.delete('/divisions/:id', deleteDivision);
    router.patch('/divisions/:id', updateDivision);
};
