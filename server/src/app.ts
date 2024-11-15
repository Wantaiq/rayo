import errorHandler from '@/middlewares/errorHandler';
import router from '@/router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';

const app = express();
config();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api', router);
app.use(errorHandler);
export default app;
