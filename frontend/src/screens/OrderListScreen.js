import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { listOrdersAdmin } from '../redux/actions/orderAction';

export default function OrderListScreen() {
    const  { loading, orders } = useSelector((state) => state?.orderListAdmin)
    console.log('orders', orders);
    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(listOrdersAdmin())
}, [dispatch]);

  return <div className='container'>
  <div className="row">
     <div className="col-6">
     <h1>Order List</h1>  
     </div>
    
  </div>
   {loading ? <h3>Loading</h3> : (
       <table className="table">
           <thead>
               <tr>
                   <th>ID</th>
                   <th>USER</th>
    
                   <th>DATE</th>
                   <th>TOTAL</th>
                   <th>PAID</th>
                   <th>DELIVERED</th>
                   <th>PRODUCT</th>
                   <th>SHIPPING PRICE</th>
                   <th>TAX PRICE</th>
                   <th></th>
               </tr>
           </thead>
           <tbody>
               {orders?.map((item, index) => {
                      return <tr key={index}>
                       <td>{item?._id}</td>
                       <td>{item?.user && item?.user?.name}</td>
                       <td>{item?.createdAt.substring(0, 10)}</td>
                       <td>${item?.totalPrice}</td>
                       <td>
                  {item?.isPaid ? ( item.paidAt.substring(0, 10) ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {item?.isDelivered ? (
                    item?.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                       <td>{item.orderItems?.map((order, index) => {
                           return <ul key = {index}> 
                               <li>Name: {order?.name}</li>
                               <li>Quantity: {order?.quantity}</li>
                               <li>Price: {order?.price}</li>
                           </ul>
                       } )}</td>
                    
                       <td>{item.shippingPrice}</td>
                       <td> {item.taxPrice}</td>
                       <td>
               
                         <NavLink to={`/order/${item?._id}`}>
                           <button className='btn-light'>
                           Detail
                           </button>
                         </NavLink>
                        
                       </td>
                     </tr>
               })}
           </tbody>
       </table>
   )}
</div>;
}
