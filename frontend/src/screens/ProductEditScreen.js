import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProductById, updateProductAdmin } from '../redux/actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../redux/constants/constants';
import { history } from '../utils/history/history';
export default function ProductEditScreen({ match }) {
    const productId = match?.params?.id

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const dispatch = useDispatch()

    const  { loading, product } = useSelector((state) => state?.productReducer)
    //const  { loading: loadingUpdate, success: successUpdate } = useSelector((state) => state?.userUpdateAdmin)
    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate,  success: successUpdate, } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/products')
          } else {
           if( !product) {
               dispatch(getProductById(productId))
           } else {
               setName(product?.name)
               setCategory(product?.category)
               setDescription(product?.description)
               setPrice(product?.price)
               setCountInStock(product?.countInStock)
               setBrand(product?.brand)
           }
        }},[productId, product, dispatch , successUpdate]);
  

    const submitHandler = (e) => {
        e.preventDefault()
        const updateProduct = {_id: productId,  name, category, description, price, countInStock, brand}
        console.log('updateProduct', updateProduct);
        dispatch(updateProductAdmin(updateProduct))
      }

  return <div>
<NavLink to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </NavLink>
      <div className = "container">
        <h1>Edit Product</h1>
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
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" name = "countInStock" onChange={(e) => setCountInStock(e.target.value)}  value = {countInStock}/>
            </div>

            <button type="submit" className="btn btn-primary">Update</button>
            </form>
        )}
      </div>

  </div>;
}
