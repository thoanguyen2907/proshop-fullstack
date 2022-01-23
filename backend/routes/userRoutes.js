import express from 'express'
const router = express.Router()
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.get('/', getUsers)
router.get('/:id', protect, admin, getUserById)
router.delete('/:id', protect, admin, deleteUser)
router.get('/profile', protect, getUserProfile)
router.post('/register', registerUser)
router.put('/profile/:id', protect, admin, updateUserProfile)
router.put('/admin/user/:id', protect, admin, updateUser)



export default router