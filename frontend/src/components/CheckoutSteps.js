import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return <div className='justify-content-center mb-4' >
      <ul className="list-group d-flex flex-row">
  <li className="list-group-item disabled">{step1 ? (
          <NavLink to='/login'>
            <p>Sign In</p>
          </NavLink>
        ) : ( <p disabled>Sign In</p> )}</li>
  <li className="list-group-item">
  {step2 ? (
          <NavLink to='/shipping'>
            <p>Shipping</p>
          </NavLink>
        ) : ( <p disabled>Shipping</p> )}
  </li>
  <li className="list-group-item">{step3 ? (
          <NavLink to='/shipping'>
            <p>payment</p>
          </NavLink>
        ) : ( <p disabled>Payment</p> )}</li>
  <li className="list-group-item">{step4 ? (
          <NavLink to='/placeorder'>
            <p>Place Order</p>
          </NavLink>
        ) : ( <p disabled>Place Order</p> )}</li>
 
</ul>

  </div>;
}
