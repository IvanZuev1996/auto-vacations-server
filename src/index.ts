import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(
    cors({
        credentials: true
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//server
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

const MONGO_DB_URL =
    'mongodb+srv://ivan-zuev:QZlaK1Hljxl7IwFi@autovacationscluster.kfpvxim.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose
    .connect(MONGO_DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/api', router());
