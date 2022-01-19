import express from 'express'
import { getProductById, getProducts } from '../controllers/productController.js'
const router = express.Router()
import Product from '../models/productModel.js'

router.get('/', getProducts)


router.get('/:id',getProductById)


export default router