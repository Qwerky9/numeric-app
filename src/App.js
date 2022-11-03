import React from 'react';
import './App.css';
import Home from './Home'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Bisection from './components/Bisection'
import Secant from './components/Secant'
import FalsePosition from './components/FalsePosition'

import ReactDOM from "react-dom";
import Sidebar from './Sidebar';
import OnePointIteration from './components/OnePointIteration';
import NewtonRaphson from './components/NewtonRaphson';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Sidebar />
      <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/Bisection" element={<Bisection/>}/>
      <Route path="/FalsePosition" element={<FalsePosition/>}/>
      <Route path="/OnePointIteration" element={<OnePointIteration/>}/>
      <Route path="/NewtonRaphson" element={<NewtonRaphson/>}/>
      <Route path="/Secant" element={<Secant/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));