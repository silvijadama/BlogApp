import React, {useState} from 'react';
import {useStore} from "../store/store";

const Product = ({product}) => {

    const setSingleProduct = useStore((state) => state.setSingleProduct)


    return (
        <div className="card">
                <img src={product.image} alt="" style={{width: 60}}/>
                <h2>{product.title}</h2>
                <p>{product.category}</p>
                <p>{product.price}$</p>
            
                <button onClick={()=>setSingleProduct(product)} className="btn">View</button>
        </div>
    );
};

export default Product;