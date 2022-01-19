import express from 'express'
const router = express.Router()
import { authUser, getUserById, getUserProfile, getUsers, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'



router.post('/login', authUser)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.get('/profile', protect, getUserProfile)
router.post('/register', registerUser)
router.put('/profile/:id', protect, updateUserProfile)



export default router