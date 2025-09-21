import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Product from "../components/Product";
import {useStore} from "../store/store";

const ProductsPage = () => {

    const {products, setProducts} = useStore()

    useEffect(() => {
        if (products.length === 0){

            fetch("https://fakestoreapi.com/products")
                .then(res => res.json())
                .then(data =>{
                    setProducts(data)
                })}
    }, []);


    return (
        <div>
            <h1>Our Products</h1>

            <div className="grid-container">
                {products.map(item =>
                    <Link to={`/products/${item.id}`}
                          className="nav-link"
                          key={item.id}>
                        <Product product={item}/>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;