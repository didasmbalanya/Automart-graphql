import express from 'express';
import { postOrder, updateOrder, getOrderById } from '../controllers/order';
import { auth } from '../middleware/auth';
import method from '../middleware/method';

const router = express.Router();


router.route('/api/v1/order')
  .post(auth, postOrder)
  .all(method);
router.route('/api/v1/order/:id')
  .patch(auth, updateOrder)
  .get(auth, getOrderById)
  .all(method);
export default router;
