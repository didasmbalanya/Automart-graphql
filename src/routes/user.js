/* eslint-disable linebreak-style */
import express from 'express';
import { signup, signin } from '../controllers/user';
// import { auth } from '../middlewear/auth';
// const auth = require('../middlewear/auth');

const router = express.Router();

router.post('/api/v1/auth/signup', signup);
router.post('/api/v1/auth/signin', signin);

export default router;
