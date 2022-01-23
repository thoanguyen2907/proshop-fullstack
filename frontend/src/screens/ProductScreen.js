import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { createProductReview, getProductById } from '../redux/actions/productAction'

export default function ProductScreen({history, match}) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const {product, loading, error} = useSelector(state => state?.productReducer)
    console.log('product', product);
    const productReviewCreate = useSelector((state) => state?.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


    useEffect(() => {
        dispatch(getProductById(match.params.id))

    }, [match.params.id, dispatch]);
    
const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }


    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)

    }
    return (
        <div>
            <NavLink className="btn btn-dark my-3" to = "/">Go Back</NavLink>
            <div className="container">
            <div className="row">
                <div className="col-6">
                <img src={product?.image} alt={product?.name} style={{height: "350px", width: "400px"}} />
                </div>
                <div className="col-3">
                <ul className="list-group list-group-flush"> 
                <li className="list-group-item">  <h4>{product?.name}</h4> </li>
                <li className="list-group-item">  <Rating value={product?.rating}/> {`${product?.numReviews} reviews`}</li>
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
                  
         <button className="btn btn-dark" 
                  onClick = {addToCartHandler}
                  disabled = {product?.countInStock === 0}>Add to cart</button> 
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-6"> 
                    <h3>Reviews</h3>
                    {product?.reviews?.length === 0 && <div> <h5> No Reviews</h5></div>}
              <div>
                {product?.reviews?.map((review, index) => (
                    <div   key={index}>
                   <strong> {review?.name}</strong>
                   <Rating value={review?.rating}></Rating>
                    <p>{review?.createdAt.substring(0, 10)}</p>
                    <p>Comment: {review?.comment}</p>
                    </div>
               
                ))}
                     </div>
            <div>
                  <h5>Write a Customer Review</h5>
                  {successProductReview && (
                    <h3>
                      Review submitted successfully
                    </h3>
                  )}
                  {loadingProductReview && <h3>Loading ...</h3> }
                
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                        <h6>Rating</h6>
                        <select className="form-select my-3"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </select>
       
                      <div className='my-3'>
                        <h6>Comment</h6>
                        <textarea
                          className ="form-control" 
                          placeholder="Leave a comment here"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
            
                      <button
                        disabled={loadingProductReview}
                        type='submit'
                        className = "btn btn-dark my-3"
                      >
                        Submit
                      </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      Please <NavLink to='/login'>sign in</NavLink> to write a review{' '}
                    </div>
                  )}
                </div>
           
            </div>
            </div>
            
         
      

        </div>
        </div>
    )
}
