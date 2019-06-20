import express from 'express';
import { auth } from '../middleware/auth';
import method from '../middleware/method';
// eslint-disable-next-line import/named
import {
  getCarById, postCar, deleteCar, getCars, changeProperty, getAdmincars,
} from '../controllers/car';

const router = express.Router();

router.route('/')
  .get((req, res) => res.send({ message: 'Welcome to AUTOMARTS API' }))
  .all(method);
router.route('/api/v1/car/:id')
  .get(getCarById)
  .delete(auth, deleteCar)
  .patch(auth, changeProperty)
  .all(method);
router.route('/api/v1/car')
  .get(getCars)
  .post(auth, postCar)
  .all(method);
router.route('/api/v1/admin/car')
  .get(auth, getAdmincars)
  .delete(auth, deleteCar)
  .all(method);

export default router;
