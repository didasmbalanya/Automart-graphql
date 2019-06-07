/* eslint-disable linebreak-style */
import express from 'express';
import { postOrder } from '../controllers/order';

const router = express.Router();


router.post('/api/v1/order', postOrder);
router.patch('/api/v1/order');

export default router;
