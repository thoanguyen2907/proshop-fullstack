import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { productReducer } from './reducer/productReducer';
import { cartReducer } from './reducer/cartReducer';
import { userDetailReducer, userReducer, userUpdateReducer,userListReducer } from './reducer/userReducer';
import { orderCreateReducer, orderDetailReducer, orderPayReducer, orderListMyReducer } from './reducer/orderReducer';
export const rootReducer = combineReducers({
    productReducer,
    cart: cartReducer,
    userLogin: userReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay:  orderPayReducer,
    orderListMy:  orderListMyReducer,
    userList: userListReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    }, 
    userLogin: {
        userInfo: userInfoFromStorage
    },


}


export const store = createStore(rootReducer, initialState, applyMiddleware(thunk)); 