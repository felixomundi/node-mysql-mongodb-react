import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from "./components/Home"
import Header from "./components/Header"
import Login from './components/Login'
import Register from "./components/Register"
import Dashboard from './components/Dashboard';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getLoginStatus, setLogin } from 'features/auth/authSlice';

import { store } from './app/store';
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchLoginStatus = async ()=> {
      // const result = await dispatch(getLoginStatus(setLogin))  
      const result = await store.dispatch(getLoginStatus(setLogin))  
      console.log(result.payload)
    }
    fetchLoginStatus()
	}, [dispatch]);

  return (
<Fragment>
<Router>
<div className='container-fluid'>
<Header />
<Routes>
<Route path='/' element={<Home />} />
<Route path='/login' element={<Login />} />
<Route path='/register' element={<Register />} /> 
<Route path='/dashboard' element={<Dashboard />} /> 
</Routes>
</div>
</Router>
<ToastContainer />
</Fragment>
  );
}

export default App;
