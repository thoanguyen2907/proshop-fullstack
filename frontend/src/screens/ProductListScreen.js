import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteProduct, listProducts } from '../redux/actions/productAction';

export default function ProductListScreen() {

    const dispatch = useDispatch()
    const {loading, products} = useSelector(state => state.productReducer)

    const deleteHandler = (id) => {
       console.log('deleteHandler');
       dispatch(deleteProduct(id))
    }

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);

  return <div className='container'>
     <div className="row">
        <div className="col-6">
        <h1>Product List</h1>  
        </div>
        <div className="col-6">
      <NavLink to = "/admin/create/product" > <button className='btn btn-dark'> <i className='fas fa-plus'> </i> Create Product</button> </NavLink> 
        </div>
     </div>
      {loading ? <h3>Loading</h3> : (
          <table className="table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>Category</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {products?.map((item, index) => {
                         return <tr key={index}>
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                       
                          <td>{item.category}</td>
                          <td> <img src={item.image} alt={item.name} style = {{width: "60px", height: "60px"}}/></td>
                          <td> {item.price}</td>
                          <td>
                  
                            <NavLink to={`/admin/edit/product/${item._id}`}> 
                              <button className='btn-light'>
                                <i className='fas fa-edit'></i>
                              </button>
                            </NavLink>
                            <button
                   
                              className='btn-danger'
                              onClick={() => deleteHandler(item._id)}
                            >
                              <i className='fas fa-trash'></i>
                            </button>
                          </td>
                        </tr>
                  })}
              </tbody>
          </table>
      )}
  </div>;
}
