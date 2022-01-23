import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { productCreateReducer, productDeleteReducer, productReducer, productReviewCreateReducer, productUpdateReducer } from './reducer/productReducer';
import { cartReducer } from './reducer/cartReducer';
import { userDetailReducer, userReducer, userUpdateReducer,userListReducer, userUpdateAdminReducer } from './reducer/userReducer';
import { orderCreateReducer, orderDetailReducer, orderPayReducer, orderListMyReducer, orderListAdminReducer, orderDeliverReducer } from './reducer/orderReducer';
export const rootReducer = combineReducers({
    productReducer,
    cart: cartReducer,
    userLogin: userReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay:  orderPayReducer,
    orderListAdmin: orderListAdminReducer,
    orderListMy:  orderListMyReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userUpdateAdmin:  userUpdateAdminReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productReviewCreate: productReviewCreateReducer

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