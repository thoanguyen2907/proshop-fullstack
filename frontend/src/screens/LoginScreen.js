import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../redux/actions/userAction'
export default function LoginScreen({location, history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect]);
    return (
        <div className='container'>
            <h3>Sign in</h3>
         <form onSubmit = {handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" name = "email" onChange={(e) => setEmail(e.target.value)}  value = {email}/>
    <div className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" name = "password" onChange={(e) => setPassword(e.target.value)} value = {password} />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        <div className="row"></div>
        </div>
    )
}
