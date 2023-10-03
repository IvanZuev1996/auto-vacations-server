import { fakeUsersList } from '../data/db';
import express from 'express';
const router = express.Router();

// путь который отрабатывает по http://localhost:8000/api/auth/login
router.get('/login', (req, res) => {
    // тут надо сделать проверку логина и пароля и вернуть результат
});

export { router as authRoute };
