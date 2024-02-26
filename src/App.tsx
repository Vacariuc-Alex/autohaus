import React from "react";
import "src/App.css";
import Home from "src/pages/Home";
import Wishlist from "src/pages/Wishlist";
import PageNotFound from "src/pages/PageNotFound";
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
