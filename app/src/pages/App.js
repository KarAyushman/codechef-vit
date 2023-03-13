import React from 'react'
import AnimatedRoutes from './../AnimatedRoutes';
import { BrowserRouter } from "react-router-dom";

function App() { 
  return (
    <BrowserRouter>
      <AnimatedRoutes/>
    </BrowserRouter>
  )
}

export default App