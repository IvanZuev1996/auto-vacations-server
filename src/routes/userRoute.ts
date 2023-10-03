import { fakeUsersList } from '../data/db';
import express from 'express';
const router = express.Router();

// путь который отрабатывает по http://localhost:8000/api/users
router.get('/', (req, res) => {
    try {
        const users = fakeUsersList;

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', (req, res) => {
    const division = req.body.division; // это подразделение из запроса

    // тут надо сделать получение сотрудников принадлежащих этому подразделению
});

export { router as userRoute };
