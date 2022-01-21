import  axios from 'axios' 
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/constants'


export const addToCart  =  (id, quantity) => {
    return async (dispatch, getState) => {
    try {
       
        const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image, 
                price: data.price, 
                countInStock: data.countInStock,
                quantity
            }
        }) 
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } catch(error) {
       console.log(error);
    }
    }
}



export const removeFromCart  =  (id) => {
    return async (dispatch, getState) => {
    try { 
      
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        }) 
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } catch(error) {
       console.log(error);
    }
    }
}

export const saveShippingAddress  =  (data) => {
    return async (dispatch, getState) => {
    try { 
      
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: data
        }) 
        localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress))

    } catch(error) {
       console.log(error);
    }
    }
}

export const savePaymentMethod  =  (data) => {
    return async (dispatch, getState) => {
    try { 
      
        dispatch({
            type: CART_SAVE_PAYMENT_METHOD,
            payload: data
        }) 
        localStorage.setItem('paymentMethod', JSON.stringify(data))

    } catch(error) {
       console.log(error);
    }
    }
}



