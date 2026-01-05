import express from 'express';
import bodyParser from 'body-parser';
import UserRouter from './routes/userRouter.js';
import CustomerRouter from './routes/customerRouter.js';
import pool from './config/db.js';

import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use('/api/auth', UserRouter);
app.use('/api', CustomerRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});