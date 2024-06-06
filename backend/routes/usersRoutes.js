import express from 'express'
const router = express.Router();
import * as userController from '../controllers/userController.js'
import * as authMiddleware from '../middleware/authMiddleware.js'

router.post('/signup', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logout)
router.post('/savedShow', userController.SaveShow)

//protected routes by cookies
router.get('/me', authMiddleware.protect, userController.getMe)
router.get('/GetSavedShow', authMiddleware.protect, userController.getSavedShow)

export default router;