import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/constants"
import  axios from 'axios' 


export const listProducts =  () => {
    return async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('http://localhost:5000/api/products/')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        }) 

    } catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    }
}

export const getProductById =  (id) => {
    return async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAIL_REQUEST})

        const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)
       
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        }) 

    } catch(error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    }
}

