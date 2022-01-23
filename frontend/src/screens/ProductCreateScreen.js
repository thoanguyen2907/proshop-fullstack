import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createProduct } from '../redux/actions/productAction';

export default function ProductCreateScreen() {

    const  { loading, product } = useSelector((state) => state?.productCreate)
  
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        const productCreated = {name, category, description, price, countInStock, brand, image }
        console.log('productCreated',productCreated);
        dispatch(createProduct(productCreated))
    }
  return <div>
      <NavLink to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </NavLink>
      <div className = "container">
        <h1>Create  Product</h1>
        {loading ? (
         <h1>Loading ...</h1>
        ) : (
            <form onSubmit = {submitHandler}>
            <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" name = "name" onChange={(e) => setName(e.target.value)
            }  value = {name}/>
            </div>
            
            <div className="mb-3">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" name = "category" onChange={(e) => setCategory(e.target.value)}  value = {category}/>
            </div>
            <div className="mb-3">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" name = "description" onChange={(e) => setDescription(e.target.value)}  value = {description}/>
            </div>
            <div className="mb-3">
            <label className="form-label">Brand</label>
            <input type="text" className="form-control" name = "brand" onChange={(e) => setBrand(e.target.value)}  value = {brand}/>
            </div>
            <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" name = "price" onChange={(e) => setPrice(e.target.value)}  value = {price}/>
            </div>
            <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="text" className="form-control" name = "image" onChange={(e) => setImage(e.target.value)}  value = {image}/>
            </div>
            <div className="mb-3">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" name = "countInStock" onChange={(e) => setCountInStock(e.target.value)}  value = {countInStock}/>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
            </form>
        )}
      </div>
  </div>;
}
