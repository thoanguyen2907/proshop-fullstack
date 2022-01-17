import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import products from '../products'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productAction'
export default function HomeScreen() {

    const dispatch = useDispatch()
    const {products, loading, error} = useSelector(state => state.productReducer)

    useEffect(() => {
        dispatch(listProducts())
    }, []);
    return (
        <>
          <h1 className='text-center'>Latest Products</h1>
          {loading? <h1 className='text-center'>Loading ...</h1> :  <div className="container">
          <div className="row">
              {products?.map((product, index) => {
                  return   <div key = {index} className="col-3 col-lg-3 col-md-6 col-sm-12">
                     
                      <Product product = {product}/>
                  </div>
              })}
            </div>
          </div>}
         
        </>
    )
}
