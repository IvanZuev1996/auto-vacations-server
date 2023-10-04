import express from 'express';
const router = express.Router();

import { User } from '../types/user';

export const fakeUsersList: Record<string, User> = {
    '1': {
        firstname: 'John',
        lastname: 'Lastname',
        division: '1'
    },
    '2': {
        firstname: 'Ivan',
        lastname: 'Lastname',
        division: '2'
    },
    '3': {
        firstname: 'David',
        lastname: 'Lastname',
        division: '1'
    }
};

router.get('/', (req, res) => {
    const division = req.query.division; // это подразделение из запроса

    const usersList = Object.values(fakeUsersList).filter(
        (user) => user.division === division
    );
    res.status(200).json(usersList);
});

export { router as userRoute };
