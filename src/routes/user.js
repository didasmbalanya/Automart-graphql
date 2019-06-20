import express from 'express';
import { signup, signin, getMe } from '../controllers/user';
import { auth } from '../middleware/auth';
import method from '../middleware/method';

const router = express.Router();

router.route('/api/v1/auth/users/me')
  .get(auth, getMe)
  .all(method);
router.route('/api/v1/auth/signup')
  .post(signup)
  .all(method);
router.route('/api/v1/auth/signin')
  .post(signin)
  .all(method);

export default router;
