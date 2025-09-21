import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useStore} from "../store/store";
import {Link} from "react-router-dom";

const SingleProductPage = () => {

    const {id} = useParams()
    const {singleProduct, setSingleProduct} = useStore()
    const addToCart = useStore((state) => state.addToCart)

    useEffect(() => {
        console.log(id)
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
            .then(data =>{
                setSingleProduct(data)
        })
    }, []);


    return (
        <div>
            <div className="pad">
                <Link className="nav-link"
                      to="/shoppingcart">
                    <div className="card">
                        <img src={singleProduct?.image} alt="Product 1"/>
                        <div className="product-title pad">{singleProduct?.title}</div>
                        <div className="product-price pad">{singleProduct?.price} $</div>
                        <div className="product-category pad">{singleProduct?.description}</div>
                        <button onClick={()=>addToCart(singleProduct)} className="add-btn pad">Add to cart</button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SingleProductPage;