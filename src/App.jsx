import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import View from './components/View/View';
import Create from './components/Create/Create';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [search, setSearch] = useState('')

  console.log(search);
  

  return (
    <div>
      <ToastContainer theme='dark' />
      
      <Routes>
        <Route path='/' element={<Home search={search} setSearch={setSearch} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/view' element={<View />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
