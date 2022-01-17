import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { productReducer } from './reducer/productReducer';

export const rootReducer = combineReducers({
    productReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk)); 