import { Route, Switch, Router } from 'react-router-dom';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { history } from './utils/history/history';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

import OrderScreen from './screens/OrderScreen';
import UserScreen from './screens/UserScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
  return (
    <Router history = {history} >
      <Header/>
  <Switch> 
    <Route path='/'  component={HomeScreen} exact/>
    <Route path='/product/:id'  component={ProductScreen} exact/>
    <Route path='/cart/:id?'  component={CartScreen} exact/>
    <Route path='/login'  component={LoginScreen} exact/>
    <Route path='/register'  component={RegisterScreen} exact/>
    <Route path='/profile'  component={ProfileScreen} exact/>
    <Route path='/shipping'  component={ShippingScreen} exact/>
    <Route path='/payment'  component={PaymentScreen} exact/>
    <Route path='/placeorder'  component={PlaceOrderScreen} exact/>
    <Route path='/order/:id'  component={OrderScreen} exact/>
    <Route path='/admin/users'  component={UserScreen} exact/>
    <Route path='/admin/edit/user/:id'  component={UserEditScreen} exact/>
    <Route path='/admin/products'  component={ProductListScreen} exact/>
    <Route path='/admin/orders'  component={OrderListScreen} exact/>
    <Route path='/admin/edit/product/:id'  component={ProductEditScreen} exact/>
    <Route path='/admin/create/product'  component={ProductCreateScreen} exact/>
    
</Switch>
   <Footer/>
</Router>
  );
}

export default App;
