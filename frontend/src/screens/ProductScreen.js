import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../redux/actions/productAction'

export default function ProductScreen({history, match}) {
    const [qty, setQty] = useState(0)
    
    const dispatch = useDispatch()
    const {product, loading, error} = useSelector(state => state.productReducer)
    useEffect(() => {
        dispatch(getProductById(match.params.id))

    }, [match.params.id, dispatch]);
    


    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)

    }
    return (
        <div>
            <NavLink className="btn btn-dark my-3" to = "/">Go Back</NavLink>
            <div className="container">
            <div className="row">
                <div className="col-6">
                <img src={product?.image} alt={product?.name} style={{height: "400px", width: "550px"}} />
                </div>
                <div className="col-3">
                <ul className="list-group list-group-flush"> 
                <li className="list-group-item">  <h4>{product?.name}</h4> </li>
                <li className="list-group-item">  <Rating value={product?.rating} text={`${product?.numReviews}`}/> </li>
                <li className="list-group-item">   <p>Price: ${product?.price}</p> </li>
                <li className="list-group-item"> <p>Description: {product?.description}</p> </li>
                </ul>
                </div>
                <div className="col-3">
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item"> Price: ${product?.price}</li>
                    <li className="list-group-item"> Status: {product?.countInStock > 0? "In Stock": "Out of Stock"}</li>
                  {product?.countInStock > 0 && (
                      <li className="list-group-item">
                          <div className="row">
                              <div className="col">Qty</div>
                              <div className="col">
                                  <form value = {qty} onChange={(e) =>  setQty(e.target.value)}>
                              <select className="form-select">
                    {[...Array(product.countInStock).keys()].map(x => (
                        <option key = {x + 1} value = {x + 1}> {x + 1}</option>
                    ))}
</select>

</form>
                              </div>
                          </div>
                      </li>
                  )}
                  
                  <li className="list-group-item"> <button className="btn btn-dark" 
                  onClick = {addToCartHandler}
                  disabled = {product?.countInStock === 0}>Add to cart</button>  </li>
                    </ul>
                </div>
            </div>
            </div>
            
         
      

        </div>
    )
}
