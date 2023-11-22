import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Register } from "./Register";


function App() { 
  const [currenForm, setCurrentForm] = useState('Register');
  
  return (
  <div className="App">
    <Register />
  </div>


    
  );
}

export default App;