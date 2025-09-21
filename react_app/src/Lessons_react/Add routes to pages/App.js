import logo from './logo.svg';
// import * as url from "node:url";
import './App.css';
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Toolbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/AboutPage" element={<AboutPage/>}/>
                    <Route path="/GalleryPage" element={<GalleryPage/>}/>
                    <Route path="/ProductsPage" element={<ProductsPage/>}/>
                    <Route path="/ProductsPage/SingleProductPage/:id" element={<SingleProductPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

