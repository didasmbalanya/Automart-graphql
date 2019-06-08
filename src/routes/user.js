/* eslint-disable linebreak-style */
import express from 'express';
import { signup, signin } from '../controllers/user';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/api/v1/auth/users/me', auth, (req, res) => {
  res.send(req.body);
});
router.post('/api/v1/auth/signup', signup);
router.post('/api/v1/auth/signin', signin);

export default router;
