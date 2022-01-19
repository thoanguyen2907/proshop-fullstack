import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';

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
  
     console.log('userInfo', userInfo);

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
          }
               
    }, []);

 

 
    return (
        <div className='container'>
            <h3>Update Profile</h3>
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

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        <div className="row"></div>
        </div>
    )
}
