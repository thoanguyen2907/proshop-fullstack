import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { listMyOrders } from '../redux/actions/orderAction';
import { NavLink } from 'react-router-dom';
import {getUserDetails, login, register, updateUserProfileFrontEnd} from '../redux/actions/userAction'
export default function ProfileScreen({location, history}) {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    // const {userInfo} = useSelector(state => state.userLogin)
    const userInfo = JSON.parse( localStorage.getItem('userInfo'))
    const {success} = useSelector(state => state.userUpdateProfile)
    const {orders} = useSelector(state => state.orderListMy)


    const submitHandler = (e) => {
        e.preventDefault()
        // if(password !== confirmPassword) {
        //     setMessage('Password do not match')
        //     return;
        // }

        dispatch(updateUserProfileFrontEnd({id: userInfo._id, name, email, password}))
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
          } else {
            setEmail(userInfo.email)
            setName(userInfo.name)
            dispatch(listMyOrders())
          }

               
    }, []);

 

 
    return (
        <div className='container'>
            <h3>Update Profile</h3>
     
        <div className="row">
          <div className="col-3">
          <form onSubmit = {submitHandler}>

<div className="mb-3">
<label className="form-label">Your Name</label>
<input type="text" className="form-control" name = "name" onChange={(e) => setName(e.target.value)
}  value = {name}/>

</div>

<div className="mb-3">
<label className="form-label">Email address</label>
<input type="email" className="form-control" name = "email" onChange={(e) => setEmail(e.target.email)}  value = {email}/>
<div className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
<label className="form-label">Password</label>
<input type="password" className="form-control" name = "password" onChange={(e) => setPassword(e.target.value)} value = {password} />
</div>

<div className="mb-3">
<label className="form-label">Confirm Password</label>
<input type="password" className="form-control" name = "confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value = {confirmPassword} />
<div className="text-danger">{message}</div>
</div>

<button type="submit" className="btn btn-primary">Update</button>
</form>
          </div>
          <div className="col-9">
              <h3>My Orders </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">PAID</th>
                    <th scope="col">DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {orders?.map((item, index) => {
                    return  <tr key = {index}>
                      <td>{item._id}</td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                  <td>{item.totalPrice}</td>
                  <td>
                    {item.isPaid ? (
                      item.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {item.isDelivered ? (
                      item.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <NavLink to={`/order/${item._id}`}>
                      <button className='btn btn-light'>
                        Details
                      </button>
                    </NavLink>
                  </td>
                    </tr>
                   
                    })}
                 
                </tbody>
              </table>
          </div>
        </div>
        </div>
    )
}
