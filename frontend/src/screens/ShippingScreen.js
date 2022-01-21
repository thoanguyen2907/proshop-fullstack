import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../redux/actions/cartAction';
import { history } from '../utils/history/history';

export default function ShippingScreen() {
    const {shippingAddress} = useSelector(state => state.cart)
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
      

        dispatch(saveShippingAddress({address, city, postalCode, country}))

        history.push('/payment')
    }
  return <div className='container'>
         <CheckoutSteps step1 step2 />

      <h1>SHIPPING</h1>

      <form className="form-control" onSubmit = {submitHandler}>
      <div className="mb-3">
    <label className="form-label">Address</label>
    <input type="text" className="form-control" name = "address" onChange={(e) => setAddress(e.target.value)
    }  value = {address} />

  </div>
  <div className="mb-3">
    <label className="form-label">City</label>
    <input type="text" className="form-control" name = "city" onChange={(e) => setCity(e.target.value)
    }  value = {city} />
  </div>

  <div className="mb-3">
    <label className="form-label">Postal Code</label>
    <input type="text" className="form-control" name = "postalCode" onChange={(e) => setPostalCode(e.target.value)
    }  value = {postalCode} />
  </div>

  <div className="mb-3">
    <label className="form-label">Country</label>
    <input type="text" className="form-control" name = "country" onChange={(e) => setCountry(e.target.value)
    }  value = {country} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  </div>;
}
