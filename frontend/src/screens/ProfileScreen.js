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
    const {userInfo} = useSelector(state => state.userLogin)
    const {success} = useSelector(state => state.userUpdateProfile)
    const {user} = useSelector((state) => state.userDetail)
    console.log('userInfo', userInfo);
    
    console.log('user', user);


    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
            return;
        }
        
        dispatch(updateUserProfileFrontEnd({id: userInfo._id, name, email, password}))
    }
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user) {
                dispatch(getUserDetails('profile'))
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [history, userInfo, dispatch, user.name, user.email, user]);

    // useEffect(() => {
       
    //             dispatch(getUserDetails('profile'))
    //             setName(user.name)
    //             setEmail(user.email)
        

    // }, [user]);

 
    return (
        <div className='container'>
            <h3>Update Profile</h3>
         <form onSubmit = {handleSubmit}>

         <div className="mb-3">
    <label className="form-label">Your Name</label>
    <input type="text" className="form-control" name = "name" onChange={(e) => setName(e.target.value)}  value = {name}/>

  </div>

  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" name = "email" onChange={(e) => setEmail(e.target.value)}  value = {email}/>
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
