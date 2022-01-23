import express from 'express'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/', getProducts)
router.post('/', protect, admin, createProduct)
router.get('/:id',getProductById)
router.put('/admin/edit/product/:id',protect, admin,  updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.post('/:id/reviews', protect, createProductReview)

export default router