import express from 'express'
const router = express.Router();
import * as userController from '../controllers/userController.js'
import * as authMiddleware from '../middleware/authMiddleware.js'

router.post('/signup', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/me', authMiddleware.protect, userController.getMe)

export default router;