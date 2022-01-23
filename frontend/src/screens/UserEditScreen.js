import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserDetails, updateUserProfileAdmin } from '../redux/actions/userAction';
import { USER_UPDATE_ADMIN_RESET } from '../redux/constants/constants';
import { history } from '../utils/history/history';

export default function UserEditScreen({ match }) {
    const userId = match?.params?.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()

    const  { loading, user } = useSelector((state) => state?.userDetail)
    const  { loading: loadingUpdate, success: successUpdate } = useSelector((state) => state?.userUpdateAdmin)

    useEffect(() => {
       if(successUpdate) {
           dispatch({type: USER_UPDATE_ADMIN_RESET})
           history.push('/admin/users')
       } else {
           if(!user?.name || user?._id !== userId) {
               dispatch(getUserDetails(userId))
           } else {
               setName(user?.name)
               setEmail(user?.email)
               setIsAdmin(user?.isAdmin)
           }
       }
    }, [successUpdate, dispatch, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault()
        const updatedData = {_id: userId, name, email, isAdmin}
        dispatch(updateUserProfileAdmin(updatedData))
      }

  return <div>
<NavLink to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </NavLink>
      <div className = "container">
        <h1>Edit User</h1>
        {loadingUpdate && <h1>Loading ...</h1>}
    
        {loading ? (
         <h1>Loading ...</h1>
        ) : (
            <form onSubmit = {submitHandler}>

            <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" name = "name" onChange={(e) => setName(e.target.value)
            }  value = {name}/>
            </div>
            
            <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name = "email" onChange={(e) => setEmail(e.target.value)}  value = {email}/>
            </div>

            <div className="form-check mb-3">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" checked= {isAdmin}      onChange={(e) => setIsAdmin(e.target.checked)}/>
    <label className="form-check-label" htmlFor="exampleCheck1">Admin</label>
  </div>

            <button type="submit" className="btn btn-primary">Update</button>
            </form>
        )}
      </div>

  </div>;
}
