import express from 'express'
import { addOrderItems, getAllOrders, getMyOrders, getOrderDetail, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
const router = express.Router()
import { admin, protect } from '../middleware/authMiddleware.js'



router.post('/add', protect, admin, addOrderItems)

router.get('/',  protect, admin, getAllOrders)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)
router.get('/', protect, getMyOrders)

 
router.get('/:id', protect, admin, getOrderDetail)
router.put('/:id/pay', protect, admin, updateOrderToPaid)




export default router