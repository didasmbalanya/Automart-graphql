/* eslint-disable linebreak-style */
import express from 'express';
import { signup, signin } from '../controllers/user';

const router = express.Router();

router.post('/api/v1/auth/signup', signup);
router.post('/api/v1/auth/signin', signin);

export default router;
