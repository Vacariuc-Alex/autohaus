import React from 'react';
import './App.css';
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import PageNotFound from "./pages/PageNotFound";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/news" element={<PageNotFound/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
