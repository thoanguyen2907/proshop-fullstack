import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, getUsers, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'



router.post('/login', authUser)
router.get('/', getUsers)
router.get('/profile', protect, getUserProfile)
router.post('/register', registerUser)



export default router