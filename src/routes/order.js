/* eslint-disable linebreak-style */
import express from 'express';
import { postOrder, updateOrder, getOrderById } from '../controllers/order';
import { auth } from '../middleware/auth';

const router = express.Router();


router.post('/api/v1/order', auth, postOrder);
router.patch('/api/v1/order/:id', auth, updateOrder);
router.get('/api/v1/order/:id', auth, getOrderById);

export default router;
