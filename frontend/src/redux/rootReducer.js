import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { productReducer } from './reducer/productReducer';
import { cartReducer } from './reducer/cartReducer';
import { userDetailReducer, userReducer, userUpdateReducer } from './reducer/userReducer';
export const rootReducer = combineReducers({
    productReducer,
    cart: cartReducer,
    userLogin: userReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    }, 
    userLogin: {
        userInfo: userInfoFromStorage
    },
}


export const store = createStore(rootReducer, initialState, applyMiddleware(thunk)); 