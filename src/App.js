import React from 'react';
import './App.css';
import Home from './Home'
import { Route, Routes } from "react-router-dom";
import NavBar from './NavBar';
import Bisection from './components/bisection'
import Secant from './components/Secant'
import FalsePosition from './components/FalsePosition'

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/bisection" element={<Bisection/>}/>
      <Route path="/falseposition" element={<FalsePosition/>}/>
      <Route path="/Secant" element={<Secant/>}/>
      </Routes>
    </div>
  );
}

export default App;
