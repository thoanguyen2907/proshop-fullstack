import  axios from 'axios' 
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../constants/constants'



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




