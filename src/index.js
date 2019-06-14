/* eslint-disable linebreak-style */

import express from 'express';
import { json, urlencoded } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import userRouter from './routes/user';
import carRouter from './routes/car';
import orderRouter from './routes/order';
import swaggerDoc from '../swagger.json';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/V1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(userRouter);
app.use(carRouter);
app.use(orderRouter);

// eslint-disable-next-line no-console
app.listen(PORT, console.log('listening on port ', PORT));

export default app;
