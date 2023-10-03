import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { userRoute } from './routes/userRoute';
import { authRoute } from './routes/authRoute';

// получаем данные из .env файла (переменные окружения)
dotenv.config();

// создаем экземаляр express и порт на котором будет разворачиваться сервер
const app: Express = express();
const port = process.env.PORT || 8000;

// дефолтный путь
app.get('/', (req: Request, res: Response) => {
    res.send('Сервер работает! Это дефолтный путь');
});

// возврат всех имеющихся пользователей (пока что данные фейковые)
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
