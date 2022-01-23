import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/constants"
import  axios from 'axios' 
import { history } from "../../utils/history/history"


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
export const updateProductAdmin = (product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      })
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
      const config = {
          headers: {
              'Content-Type' : 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      
      const { data } = await axios.put(
        `http://localhost:5000/api/products/admin/edit/product/${product._id}`, product, config )
  
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL

      })
    }

    export const deleteProduct  =  (id) => {
        return async (dispatch, getState) => {
         
        try {
            dispatch({type: PRODUCT_DELETE_REQUEST})
    
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.delete(`http://localhost:5000/api/products/${id}`, config)
        
            dispatch({
                type: PRODUCT_DELETE_SUCCESS })
                dispatch(listProducts())
     } catch(error) {
           console.log(error);
           dispatch({
               type: PRODUCT_DELETE_FAIL
           })
        }
        }
    }
    export const createProduct = (product) => async (dispatch, getState) => {
        try {
          dispatch({
            type: PRODUCT_CREATE_REQUEST,
          })
      
          const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
      
          const { data } = await axios.post(`http://localhost:5000/api/products`, product, config)
          console.log(data);
          dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
          })
          history.push("/admin/products")
        } catch (error) {
          
          dispatch({
            type: PRODUCT_CREATE_FAIL
          })
       
        } }

  export const createProductReview = (productId, review) => async (dispatch, getState) => {
          try {
            dispatch({
              type: PRODUCT_CREATE_REVIEW_REQUEST,
            })
        
            const {
              userLogin: { userInfo },
            } = getState()
        
            const config = {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
        
            const { data } = await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, review, config)
            console.log(data);
            dispatch({
              type: PRODUCT_CREATE_REVIEW_SUCCESS
            })
            dispatch(getProductById(productId))
          } catch (error) {
            
            dispatch({
              type: PRODUCT_CREATE_REVIEW_FAIL
            })
         
          } 

        }