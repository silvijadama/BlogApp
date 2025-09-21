import logo from './logo.svg';
// import * as url from "node:url";
import './App.css';
import React, {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProductsPage from "./pages/AllProductsPage";
import AddedProductPage from "./pages/AddedProductPage";
import Toolbar from "./components/Toolbar";
import EditProductsPage from "./pages/EditProductsPage";



function App() {

    const [getProducts, setProducts] = useState([])
    const [getSelectedProduct, setSelectedProduct] = useState({})
    const [getQuantity, setQuantity] = useState(1)
    const [getAddProduct, setAddProduct] = useState([])
    const [getEditProduct, setEditProduct] = useState({})
    const [getBgColor, setBgColor] = useState("#ffffff")

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                setProducts(data)
            })
    }, []);


    return (
        <div className="App">
            <BrowserRouter>
                <Toolbar/>
                <Routes>
                    <Route path="/" element={<AllProductsPage
                        products={getProducts} //// fetches all products from api
                        getSelectedProduct={getSelectedProduct}
                        setSelectedProduct={setSelectedProduct}
                        getQuantity={getQuantity}
                        setQuantity={setQuantity}
                        setAddProduct={setAddProduct}
                        getAddProduct={getAddProduct}
                    />} />

                    <Route path="/addedproducts" element={<AddedProductPage
                        getAddProduct={getAddProduct}
                        setAddProduct={setAddProduct}
                        setQuantity={setQuantity}
                        getQuantity={getQuantity}
                        getSelectedProduct={getSelectedProduct}
                        getEditProduct={getEditProduct}
                        setEditProduct={setEditProduct}
                    />}/>

                    <Route path="/editproducts" element={<EditProductsPage
                        products={getProducts}
                        getSelectedProduct={getSelectedProduct}
                        setSelectedProduct={setSelectedProduct}
                        getQuantity={getQuantity}
                        setQuantity={setQuantity}
                        getAddProduct={getAddProduct}
                        setAddProduct={setAddProduct}
                        getEditProduct={getEditProduct}
                        setEditProduct={setEditProduct}/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;

