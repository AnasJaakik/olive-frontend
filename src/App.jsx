import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/products'
import About from './pages/about'
import Cart from './pages/cart'
import Login from './pages/login'
import Process from './pages/process'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar/>
        <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path='/products/:productsId' element={<Products/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/process' element={<Process/>} /> 
      

        </Routes>
       
    </div>
  )
}

export default App
 