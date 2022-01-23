import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return <div className='justify-content-center mb-4' >
      <ul className="list-group d-flex flex-row">
  <li className="list-group-item disabled">{step1 ? (
          <NavLink to='/login' className="text-dark text-decoration-none font-weight-bold" >
            <p>Sign In</p>
          </NavLink>
        ) : ( <p className='disabled text-light'>Sign In</p> )}</li>
  <li className="list-group-item">
  {step2 ? (
          <NavLink to='/shipping' className="text-dark text-decoration-none font-weight-bold">
            <p>Shipping</p>
          </NavLink>
        ) : ( <p className='disabled text-light'>Shipping</p> )}
  </li>
  <li className="list-group-item">{step3 ? (
          <NavLink to='/shipping' className="text-dark text-decoration-none font-weight-bold">
            <p>Payment</p>
          </NavLink>
        ) : ( <p className='disabled text-light'>Payment</p> )}</li>
  <li className="list-group-item">{step4 ? (
          <NavLink to='/placeorder' className="text-dark text-decoration-none font-weight-bold">
            <p>Place Order</p>
          </NavLink>
        ) : ( <p className='disabled text-light'>Place Order</p> )}</li>
 
</ul>

  </div>;
}
