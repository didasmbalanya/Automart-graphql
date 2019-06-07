/* eslint-disable linebreak-style */
import express from 'express';
import { postOrder, updateOrder, getOrderById } from '../controllers/order';

const router = express.Router();


router.post('/api/v1/order', postOrder);
router.patch('/api/v1/order/:id', updateOrder);
router.get('/api/v1/order/:id', getOrderById);

export default router;
