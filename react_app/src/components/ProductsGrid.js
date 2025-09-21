import React, {useState} from 'react';

const ProductGrid = (props) => {



    return (
        <div className="container">
            <h2>ADD ITEM PAGE</h2>

            <label className="select-label">select icon</label>
            <div className="icon-grid">
                <div className="icon">product</div>
            </div>

            <input type="text" placeholder="TITLE" className="input-field"/>
            <input type="number" placeholder="QUANTITY" className="input-field"/>

            <button className="add-btn">ADD</button>
        </div>
    );
};

export default ProductGrid;