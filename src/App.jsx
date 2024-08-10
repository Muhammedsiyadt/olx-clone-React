import React from 'react'
import Home from './Pages/Home'
import { Routes , Route, useNavigate  } from 'react-router-dom'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import View from './components/View/View'
import Create from './components/Create/Create'

const App = () => {

  const navigate = useNavigate() 

  return (
    <div>
      <Routes >
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/view' element={<View/>}/>
        <Route path='/create' element={<Create/>}/>

      </Routes>
    </div>
  )
}

export default App
