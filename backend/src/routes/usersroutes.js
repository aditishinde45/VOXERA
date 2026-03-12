// routes/user.routes.js
import express from 'express';
import { login, register, getUserHistory, addToHistory } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/get_all_activity', getUserHistory);
router.post('/addToHistory', addToHistory);
//router.get('/get_all_activity', getUserActivity);

export default router;