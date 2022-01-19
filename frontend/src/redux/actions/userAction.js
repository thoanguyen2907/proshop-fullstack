import  axios from 'axios' 
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/constants'



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





