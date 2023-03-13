import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import { Routes, Route, useLocation } from "react-router-dom";
import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/*" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
            </Routes>
        </AnimatePresence>
        
    )
}

export default AnimatedRoutes