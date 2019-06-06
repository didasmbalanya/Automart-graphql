/* eslint-disable linebreak-style */
import express from 'express';
import { signup, signin, getUsers } from '../controllers/user';
// import { auth } from '../middlewear/auth';
const auth = require('../middlewear/auth');

const router = express.Router();

router.post('/api/v1/auth/signup', signup);
router.post('/api/v1/auth/signin', signin);
router.get('/api/v1/auth/users', auth, getUsers);

export default router;
