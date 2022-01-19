import { Route, Switch, Router } from 'react-router-dom';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { history } from './utils/history/history';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router history = {history} >
      <Header/>
  <Switch> 
    <Route path='/'  component={HomeScreen} exact/>
    <Route path='/product/:id'  component={ProductScreen} exact/>
    <Route path='/cart/:id?'  component={CartScreen} exact/>
    <Route path='/login'  component={LoginScreen} exact/>
</Switch>
   <Footer/>
</Router>
  );
}

export default App;
