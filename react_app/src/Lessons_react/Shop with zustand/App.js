import logo from './logo.svg';
// import * as url from "node:url";
import './App.css';
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

function App() {


    return (
        <div className="App">
            <BrowserRouter>
                <Toolbar/>
                <Routes>
                    <Route path="/products" element={<ProductsPage/>}></Route>
                    <Route path="/products/:id" element={<SingleProductPage/>}></Route>
                    <Route path="/shoppingcart" element={<ShoppingCartPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

