import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../redux/actions/orderAction';
import { history } from '../utils/history/history';

export default function PlaceOrderScreen() {
    
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success} = orderCreate;
    
    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
    }, [success, order]);


    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice:  cart.itemsPrice,
            shippingPrice:  cart.shippingPrice,
            totalPrice   : cart.totalPrice,
            taxPrice:   cart.taxPrice
        }))
    }
    //calculate price
    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)

    cart.shippingPrice = cart.cartItems > 100 ? 0 : 100

    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2)) 

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  return <div>
      <CheckoutSteps step1 step2 step3 step4/>
      <div className="row">
          <div className="col-8">
              <ul className="list-group flush">
                  <li className="list-group-item">
                      <h4>Shipping</h4>
                      <p> <strong>Address: </strong> 
                        {cart.shippingAddress.address},    {cart.shippingAddress.city},
                        {cart.shippingAddress.postalCode},  {cart.shippingAddress.country}
                       </p>
                  </li>
                  <li className="list-group-item">
                    <h4>Payment Method</h4>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                  </li>
                  <li className="list-group-item">
                    <h4>Orders</h4>
                    {cart.cartItems.length === 0 ? 'Your cart is empty' : (
                        <ul className="list-group flush">
                            {cart.cartItems.map((item, index) => {
                                return  <li className="list-group-item" key = {index}>
                                    <div className="row">
                                        <div className="col-10">
                                            <div className="row">
                                            <div className="col-1">
                                            <img src={item.image} alt={item.name}  style = {{width: '40px', height: '40px'}}/>
                                        </div>
                                        <div className="col-4">
                                        <p> <NavLink to = {`/product/${item.product}`}> 
                                           {item.name}  </NavLink></p>
                                        </div>
                                        <div className="col-4">
                                            {item.quantity} x ${Number(item.price).toFixed(2)} = ${Number(item.quantity * item.price).toFixed(2)}
                                        </div>
                                            </div>
                                        </div>
                                     
                                       
                                    </div>
                                   </li>
                            })}
                     
                        </ul>
                    )}
                  </li>
            
              </ul>
          </div>
          <div className="col-4">
                                            <div className="card">
                                                <ul className="list-group flush">
                                                    <li className="list-group-item">
                                                        <h4>Order Summary</h4>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col">Items</div>
                                                            <div className="col">${cart.itemsPrice}</div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col">Shipping</div>
                                                            <div className="col">${cart.shippingPrice}</div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col">Tax</div>
                                                            <div className="col">${cart.taxPrice}</div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col">Total</div>
                                                            <div className="col">${cart.totalPrice}</div>
                                                        </div>
                                                    </li>

                                                    <li className="list-group-item">
                                                       <button type="button" className='btn btn-secondary btn-lg' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}> Place Order </button>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
      </div>
  </div>;
}
