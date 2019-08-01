import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Cover from './Cover'

function App() {
  return (
    <BrowserRouter>
      <Cover className='cover'/>
    </BrowserRouter>
  );
}

export default App;
