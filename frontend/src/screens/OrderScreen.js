import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder, deliverOrder, getOrderDetail, payOrder } from '../redux/actions/orderAction';
import { history } from '../utils/history/history';
import axios from 'axios'; 
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from '../redux/constants/constants';

export default function OrderScreen({match}) {
    
    const dispatch = useDispatch()
    const orderId = match.params.id
    const orderDetail = useSelector(state => state.orderDetail)

    const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

    const [sdkReady, setSdkReady] = useState(false);
    const {order, loading } = orderDetail;
  console.log('order', order);
    const orderPay = useSelector(state => state.orderPay)

    
    const {loading:loadingPay, success:successPay } = orderPay;

    const deliverHandler = () => {
      dispatch(deliverOrder(order))
    }
  

    useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      }

        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('http://localhost:5000/api/config/paypal')
            console.log(clientId);
            const script = document.createElement('script')
            script.type = "text/javascript"
            script.async = true 
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetail(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal){
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
      
    }, [dispatch, orderId, successPay, order]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId,paymentResult ))
    }
    

  return <div className="container">
      <CheckoutSteps step1 step2 step3 step4/>
      OrderScreen
      <h1>Order {order?._id}</h1>
      <div className="row">
          <div className="col-8">
              <ul className="list-group">
                  <li className="list-group-item">
                      <h4>Shipping</h4>
                      <p>
                          <strong>Name : </strong> {order?.user?.name}
                      </p>
                      <p> 
                          <strong>Email: </strong> {' '} 
                        <a href={`mailto: ${order?.user?.email}`}>{order?.user?.email}</a>
                      </p>
                      <p>
                <strong>Address:</strong>
                {order?.shippingAddress.address}, {order?.shippingAddress.city}{' '}
                {order?.shippingAddress.postalCode},{' '}
                {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <div  className = "text-danger">
                  Delivered on {order?.deliveredAt}
                </div>
              ) : (
                <div className = "text-danger">Not Delivered</div>
              )}


                  </li>
                  <li className="list-group-item">
                  <h4>Payment Method</h4>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p> 
              {order?.isPaid ? (
                <div className = "text-danger">Paid on {order.paidAt}</div>
              ) : (
                <div className = "text-danger">Not Paid</div>
              )}

                  </li>
                  <li className="list-group-item">
                  <h4>Order Items</h4>
                  {order?.orderItems.length === 0 ? (
                <h2>Order is empty</h2>
              ) : (
                <ul className="list-group">
                  {order?.orderItems.map((item, index) => (
                    <li className="list-group-item" key={index}>
                      <div className="row">
                        <div className="col">
                          <img
                            style={{width: "50px", height: "50px"}}
                            src=  {item?.image}
                            alt={item?.name}
                          />
                        </div>
                        <div className="col">
                          <NavLink to={`/product/${item?.product}`} className="text-dark text-decoration-none">
                            {item?.name}
                          </NavLink>
                        </div>
                        <div className="col-4">
                          {item?.quantity} x ${item?.price} = ${item?.quantity * item?.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
                  </li>
              </ul>
          </div>
          <div className="col-4">
          <div className= "card">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className = "row">
                  <div className = "col">Items</div>
                  <div className = "col">${order?.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className = "row">
                  <div className = "col">Shipping</div>
                  <div className = "col">${order?.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className = "row">
                  <div className = "col">Tax</div>
                  <div className = "col">${order?.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className = "row">
                  <div className = "col">Total</div>
                  <div className = "col">${order?.totalPrice}</div>
                </div>
              </li>
              {!order?.isPaid && (
                  <li>
                      {loadingPay && <h1>Loading ...</h1>}
                      {loadingPay ? <h1>Loading ...</h1> : (
                          <PayPalButton amount={order?.totalPrice} onSuccess={successPaymentHandler}/>
                      ) }
                  </li>
              )}

{loadingDeliver && <h3>Loading ...</h3> }
              {userInfo &&
                userInfo?.isAdmin &&
                order?.isPaid &&
                !order?.isDelivered && (
                  <li>
                    <button
                      type='button'
                      className='btn btn-dark'
                      onClick={deliverHandler} >
                      Mark As Delivered
                    </button>
                  </li>
                )}

            </ul>
          </div>
        </div>

      </div>
  </div>;
}
