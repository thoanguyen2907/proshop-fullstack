import React from 'react'
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../redux/actions/userAction';
export default function Header() {
  const dispatch = useDispatch()
  const  {loading, error, userInfo} = useSelector(state => state.userLogin)

  const logoutHandler = () => {
    console.log('logoutHandler');
    dispatch(logout())
  }
    return (
        <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <NavLink className="navbar-brand" to="/">Proshop</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/cart"> <i className="fas fa-shopping-cart"></i> Cart</NavLink>
        </li>
          {
            userInfo? (
    <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {userInfo.name}
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <NavLink to = "/profile">   <li className="dropdown-item" to = "/profile">Profile</li></NavLink>
    <li className="dropdown-item" onClick={logoutHandler}> Logout
    </li>
  </div>
</div>) : <NavLink className="nav-link text-white" to="/login"> <i className="fas fa-user"></i> Sign in</NavLink>
          }
    
    {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonAdmin" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Admin
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonAdmin">

                
                    <NavLink to = "/admin/users">   <li className="dropdown-item">Users</li></NavLink>
             
             
                    <NavLink to = "/admin/products"> <li className="dropdown-item"> Products</li></NavLink>
           
          
                    <NavLink to = "/admin/orders"> <li className="dropdown-item"> Orders </li> </NavLink>
              
                  </div>
                </div>
              )} 
       
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}
