import React from 'react'
import { NavLink } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const {product} =  props;
    return (
        <div>
            <div className="card my-3">
  <img src= {product.image} className="card-img-top" alt={product.name}/>
  <div className="card-body" style={{padding: '20px'}}>

   <NavLink to = {`/product/${product._id}`}><h5 className="card-title text-dark">{product.name}</h5></NavLink> 
    <div><Rating value = {product.rating} text={`${product.numReviews} reviews`}/></div>
   
    <p className="card-text">{product.rating} from {product.numReviews} reviews</p>
    <h4  className="card-text">${product.price}</h4>
    <NavLink to = {`/product/${product._id}`} >Add to cart </NavLink>
  </div>
</div>
        </div>
    )
}
