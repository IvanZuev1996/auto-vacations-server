import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();

const port = process.env.PORT || 8000;

console.log(port);

app.get('/', (req: Request, res: Response) => {
    res.send('Сервер работает! Это дефолтный путь');
});

app.get('/users', (req: Request, res: Response) => {
    res.send('Users here');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
