/* eslint-disable linebreak-style */
import express from 'express';
import { auth } from '../middleware/auth';
// eslint-disable-next-line import/named
import {
  getCars, getCarById, postCar, changeProperty, deleteCar,
} from '../controllers/car';


const router = express.Router();

router.get('/', (req, res) => res.send({ message: 'Welcome to AUTOMARTS API' }));
router.get('/api/v1/car', getCars);
router.get('/api/v1/car/:id', getCarById);
router.get('/api/v1/car?status=available&state=new');
router.get('/api/v1/car?status=available&state=used');
router.get('/api/v1/car?body_type=bodyType');
router.get('/api/v1/car?status=available&manufacturer=XXXValue');
router.post('/api/v1/car', auth, postCar);
router.patch('/api/v1/car/:id', auth, changeProperty);
router.delete('/api/v1/car/:id', auth, deleteCar);


export default router;
