import  axios from 'axios' 
import { history } from '../../utils/history/history'
import { ORDER_LIST_MY_RESET, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_DETAIL_RESET, USER_LIST_RESET } from '../constants/constants'



export const login  =  (email, password) => {
    return async (dispatch, getState) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        
        const {data} = await axios.post('http://localhost:5000/api/users/login', {email, password})
        console.log(data);
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
       console.log(error);
    }
    }
}

export const logout  =  (email, password) => {
    return async (dispatch, getState) => {
  localStorage.removeItem('userInfo')
  dispatch({type: USER_LOGOUT})
  dispatch({type: USER_DETAIL_RESET})
  dispatch({type: ORDER_LIST_MY_RESET})
  dispatch({type: USER_LIST_RESET})
  history.push('/login')
    }
}

export const register  =  (name, email, password) => {
    return async (dispatch, getState) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})
       
        const {data} = await axios.post('http://localhost:5000/api/users/register', {name, email, password})
        console.log(data);
        
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
       console.log(error);
       dispatch({
           type: USER_REGISTER_FAIL
       })
    }
    }
}


export const getUserDetails  =  (id) => {
    return async (dispatch, getState) => {
    try {
        dispatch({type: USER_DETAIL_REQUEST})

        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        console.log('userInfo', userInfo);
        
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${id.token}`
            }
        }
        const {data} = await axios.get(`http://localhost:5000/api/users/${id}`, config)
        console.log("data", data);
        
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })

    } catch(error) {
       console.log(error);
       dispatch({
           type: USER_DETAIL_FAIL
       })
    }
    }
}

export const updateUserProfileFrontEnd  =  (user) => {
    return async (dispatch, getState) => {
     
    try {
        dispatch({type: USER_UPDATE_REQUEST})

        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`http://localhost:5000/api/users/profile/${userInfo._id}`, user, config)
    
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

    } catch(error) {
       console.log(error);
       dispatch({
           type: USER_UPDATE_FAIL
       })
    }
    }
}

export const getUserList  =  () => {
    return async (dispatch, getState) => {
     
    try {
        dispatch({type: USER_LIST_REQUEST})

        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('http://localhost:5000/api/users', config)
    
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch(error) {
       console.log(error);
       dispatch({
           type: USER_LIST_FAIL
       })
    }
    }
}





