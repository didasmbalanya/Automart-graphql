/* eslint-disable linebreak-style */
import express from 'express';
import { getCars, getCarById } from '../controllers/car';
// import { auth } from '../middlewear/auth';
// const auth = require('../middlewear/auth');

const router = express.Router();

router.get('/api/v1/car/', getCars);
router.get('/api/v1/car/:id/', getCarById);
router.get('/api/v1/car?status=available');
router.get('/api/v1/car?status=available&min_price=XXXValue&max_price=XXXValue');
router.get('/api/v1/car?status=available&state=new');
router.get('/api/v1/car?status=available&state=used');
router.get('/api/v1/car?body_type=bodyType');
router.get('/api/v1/car?status=available&manufacturer=XXXValue');
router.post('/api/v1/car');
router.patch('/api/v1/<:car-id>/status');
router.patch('/api/v1/<:car-id>/price');
router.delete('api/v1/car/<:car_id>/');


export default router;
