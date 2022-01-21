
import React, { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserList } from '../redux/actions/userAction';
import { history } from '../utils/history/history';

export default function UserScreen() {
    const dispatch = useDispatch()
    const {loading, users} = useSelector(state => state.userList)
    const {userInfo} = useSelector(state => state.userLogin)
    console.log('userInfo', userInfo);
    
    // const userInfo = JSON.parse( localStorage.getItem('userInfo'))

    const deleteHandler = () => {
        console.log('deleteHandler');
    }
    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(getUserList())
        } else {
            history.push("/login")
        }
        // dispatch(getUserList())
    }, [dispatch, userInfo]);

  return <div className='container'>
      
      <h1>Users</h1> 
      {loading ? <h3>Loading</h3> : (
          <table className="table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>ADMIN</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user, index) => {
                         return <tr key={index}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </td>
                          <td>
                            {user.isAdmin ? (
                              <i className='fas fa-check' style={{ color: 'green' }}></i>
                            ) : (
                              <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}
                          </td>
                          <td>
                            <NavLink to={`/admin/user/${user._id}/edit`}>
                              <button className='btn-light'>
                                <i className='fas fa-edit'></i>
                              </button>
                            </NavLink>
                            <button
                   
                              className='btn-danger'
                              onClick={() => deleteHandler(user._id)}
                            >
                              <i className='fas fa-trash'></i>
                            </button>
                          </td>
                        </tr>
                  })}
              </tbody>
          </table>
      )}
      </div>;
}
