import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod, saveShippingAddress } from '../redux/actions/cartAction';
import { history } from '../utils/history/history';

export default function PaymentScreen() {
    const {shippingAddress} = useSelector(state => state.cart)
    const dispatch = useDispatch()

    console.log('shippingAddress' , shippingAddress);

    if(!shippingAddress) {
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal'); 


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('placeorder')

    }
  return <div className='container'>
         <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>

      <form className="form-control" onSubmit = {submitHandler}>
    <div className="input-group">
  <div className="input-group-prepend mx-3">
    <div className="input-group-text">
      <input name = "paymentMethod" type="radio" onChange={(e) => setPaymentMethod(e.target.value)} 
      value="Paypal" checked/>
    </div>
  </div>
  <p>Paypal or Credit Card</p>
</div>


  <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  </div>;
}
