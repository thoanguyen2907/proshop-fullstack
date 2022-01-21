import express from 'express'
import { addOrderItems, getAllOrders, getMyOrders, getOrderDetail, updateOrderToPaid } from '../controllers/orderController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'



router.post('/add', protect, addOrderItems)

router.get('/', getAllOrders)
router.get('/myorders',protect, getMyOrders)

 
router.get('/:id', getOrderDetail)
router.put('/:id/pay', protect,  updateOrderToPaid)




export default router