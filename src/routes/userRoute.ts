import { fakeUsersList } from '../data/db';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const division = req.query.division; // это подразделение из запроса
    
    const usersList = Object.values(fakeUsersList).filter(user => user.division === division);
    res.status(200).json(usersList);
});

export { router as userRoute };
