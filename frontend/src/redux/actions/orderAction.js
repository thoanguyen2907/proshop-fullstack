import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/constants"
import  axios from 'axios' 

export const createOrder =  (order) => {
    return async (dispatch) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST})
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
   
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post('http://localhost:5000/api/orders/add', order, config)
       
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        }) 

    } catch(error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    }
}


export const getOrderDetail =  (id) => {
    return async (dispatch) => {
    try {
        dispatch({type: ORDER_DETAIL_REQUEST})
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
     
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`http://localhost:5000/api/orders/${id}`, config)
       
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        }) 

    } catch(error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    }
}


export const payOrder =  (orderId, paymentResult) => {
    return async (dispatch) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST})
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, paymentResult, config)
       
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        }) 
    } catch(error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    }
}

export const listMyOrders =  () => {
    return async (dispatch) => {
    try {
        dispatch({type: ORDER_LIST_MY_REQUEST})
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('http://localhost:5000/api/orders/myorders', config)
       
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        }) 
    } catch(error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    }
}


