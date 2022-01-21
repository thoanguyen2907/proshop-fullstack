import { width } from 'dom-helpers'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addToCart, removeFromCart } from '../redux/actions/cartAction'

export default function CartScreen({match, location, history}) {
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.cart)
    const productId = match.params.id

    const qty = location.search? Number(location.search.split('=')[1]) : 1
    
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        console.log('remove');
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return ( 
        <div>
          <div className="row">
          <h1>Shopping Cart</h1>
              <div className="col-8">
              
                {cartItems.length  === 0 ? <h3>Your cart is empty <NavLink to = "/">Go back</NavLink></h3> : (
                    <ul className="list-group list-group-flush">
                        {cartItems.map(item => {
                   
                            return   <li key={item.product} className="list-group-item">
                                <div className="row">
                                    <div className="col-2">
                                        <img src={item.image} alt={item.name}  style = {{width: '100px'}} className="fluid" />
                                    </div>
                                    <div className="col-3">
                                        <NavLink to = {`/product/${item.product}`}>{item.name}</NavLink>
                                    </div>
                                    <div className="col-2">{item.price}</div>
                                    <div className="col-2">
                                    <form value = {item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                              <select className="form-select">
                    {[...Array(item.countInStock).keys()].map(x => (
                        <option key = {x + 1} value = {x + 1}> {x + 1}</option>
                    ))}
</select>

</form>
                                    </div>
                                    <div className="col-2">
                  <button className="btn btn-light" onClick = {() => {
                      removeFromCartHandler(item.product)
                  }}><i className="fas fa-trash"></i></button>
              </div>
                                </div>
                            </li>
                        })}

                 
                  </ul>
                )}
              </div>
              <div className="col-4">
              <ul className="list-group list-group-flush">
  <li className="list-group-item">
      <h5>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h5>
      ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}
  </li>
 <NavLink  className="list-group-item" to = "/shipping"> 
        <button type = "button" className="btn-dark" onClick = {checkoutHandler}> 
        Proceed To Checkout
        </button>
 </NavLink>
</ul>
              </div>
          </div>
        </div>
    )
}
