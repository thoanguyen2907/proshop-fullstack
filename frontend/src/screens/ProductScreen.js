import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'

export default function ProductScreen({match}) {

    const [product, setProduct] = useState({});
  
    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await  axios.get(`http://localhost:5000/api/products/${match.params.id}`)

            setProduct(data)

        }
        fetchProducts()
    }, [match]);

    return (
        <div>
            <NavLink className="btn btn-dark my-3" to = "/">Go Back</NavLink>
            <div className="container">
            <div className="row">
                <div className="col-6">
                <img src={product.image} alt={product.name} style={{height: "400px", width: "550px"}} />
                </div>
                <div className="col-3">
                <ul className="list-group list-group-flush"> 
                <li className="list-group-item">  <h4>{product.name}</h4> </li>
                <li className="list-group-item">  <Rating value={product.rating} text={`${product.numReviews}`}/> </li>
                <li className="list-group-item">   <p>Price: ${product.price}</p> </li>
                <li className="list-group-item"> <p>Description: {product.description}</p> </li>
                </ul>
                </div>
                <div className="col-3">
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item"> Price: ${product.price}</li>
                    <li className="list-group-item"> Status: {product.countInStock > 0? "In Stock": "Out of Stock"}</li>
                  <li className="list-group-item"> <button className="btn btn-dark" 
                  disabled = {product.countInStock === 0}>Add to cart</button>  </li>
                    </ul>
                </div>
            </div>
            </div>
            
         
      

        </div>
    )
}
