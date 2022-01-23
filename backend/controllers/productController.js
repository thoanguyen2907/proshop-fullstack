import Product from '../models/productModel.js'; 



const getProducts = async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}
const deleteProduct = async (req, res) => {
    const user = await Product.findById(req.params.id) 
    if (user) {
        await Product.deleteOne({ _id: req.params.id})
        res.status(201).json({
            message: "Delete successfully !!"
        })
    } else {
      res.status(404).json({
        messages: 'Product not found'
      })
    }
  }
  const updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = req.body.name || product.name
        product.category = req.body.category || product.category
        product.description = req.body.description || product.description
        product.price = req.body.price || product.price
        product.countInStock = req.body.countInStock || product.countInStock
        product.brand = req.body.brand || product.brand
        product.image = req.body.image || product.image
        
      const updatedProduct = await product.save()
  
      res.json({
        _id: updatedProduct._id,
        name: updatedProduct.name,
        category: updatedProduct.category,
        description: updatedProduct.description,
        price: updatedProduct.price,
        countInStock: updatedProduct.countInStock,
        brand: updatedProduct.brand,
        image: updatedProduct.image,
      })
    } else {
      res.status(404).json({
          message: 'Product not found'
      })
    }
  }
  const createProduct = async (req, res) => {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      numReviews: req.body.numReviews,
      description: req.body.description,
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  }

  const createProductReview = async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404).json({ message: 'Product is reviewed already' })
    }
  }
 
export {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview
}
