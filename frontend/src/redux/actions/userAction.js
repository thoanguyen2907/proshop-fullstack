import  axios from 'axios' 
import { get } from 'jquery'
import { USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../constants/constants'



export const login  =  (email, password) => {
    return async (dispatch, getState) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
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
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`http://localhost:5000/api/users/${userInfo._id}`, config)
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
        const {data} = await axios.put('http://localhost:5000/api/users/profile', user, config)
        console.log("data", data);
        
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





