import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import Header from './components/Header';

function App() {
  return (
    <div className='bg-emerald-800'>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/watchlist' element={<Watchlist/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    
  )
}

export default App
