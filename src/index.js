/* eslint-disable linebreak-style */

import express from 'express';
import { json, urlencoded } from 'body-parser';
import userRouter from './routes/user';
import carRouter from './routes/car';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(userRouter);
app.use(carRouter);

// eslint-disable-next-line no-console
app.listen(PORT, console.log('listening on port ', PORT));
