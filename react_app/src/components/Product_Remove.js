import React from 'react';

const ProductRemove = (props) => {
    return (
        <div>
            <div className="card2">
                <img src={props.product.image} alt="" style={{width: 60}}/>
                <h3>{props.product.title}</h3>
                <p>{props.product.category}</p>
                <p>{props.product.price}$</p>
                <button onClick={props.removeItem} className="btn">Remove</button>
            </div>
        </div>
    );
};

export default ProductRemove;