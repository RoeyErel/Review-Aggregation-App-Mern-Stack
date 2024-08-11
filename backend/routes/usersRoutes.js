import express from 'express'
const router = express.Router();
import * as userController from '../controllers/userController.js'
import * as authMiddleware from '../middleware/authMiddleware.js'
import { tokenMiddleware } from '../middleware/tokenMiddleware.js';
import { sessionMiddleware } from '../middleware/sessionMiddleware.js';

router.post('/signup', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logout)
router.post('/savedShow', userController.SaveShow)

router.get('/me', authMiddleware.protect, userController.getMe);
router.get('/GetSavedShow', tokenMiddleware, authMiddleware.protect, userController.getSavedShow);

export default router;