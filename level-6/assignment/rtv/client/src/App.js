import React, {useState, useContext} from 'react';
import { UserContext } from './context/UserProvider';
import NavPage from './components/NavPage';
import Profile from './components/Profile.js';
import Public from './components/Public.js'
import Login from './components/Login.js';
import Auth from './components/Auth';
import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {token} = useContext(UserContext)
  return (
    <div className="App">
<NavPage/>

<Routes>
<Route path='/'element={token ? <Navigate to="/profile"/> : <Navigate to="/auth"/> }/>
  <Route path='/auth'element={<Auth/>}/>
  <Route path='/public'element={<Public/>}/>
  <Route path='/profile' element={<Profile/>}/>



</Routes>
    

    </div>
  );
}

export default App;
