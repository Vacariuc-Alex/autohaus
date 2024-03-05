import React from "react";
import "src/App.css";
import Home from "src/pages/Home";
import Wishlist from "src/pages/Wishlist";
import PageNotFound from "src/pages/PageNotFound";
import ElementDetails from "src/pages/elementDetails/ElementDetails";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "src/pages/Register";
import Login from "src/pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/news" element={<PageNotFound/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/product/:id" element={<ElementDetails/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
