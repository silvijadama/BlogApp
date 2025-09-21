import React from 'react';
import {useNavigate} from "react-router-dom";

const AddedProductPage = ({getAddProduct, setAddProduct, setEditProduct}) => {
    const navigate = useNavigate()

    function deleteProduct(id){
        let prodToRemove = getAddProduct.filter(item => item.id !== id)
        setAddProduct(prodToRemove)
        console.log("delete button cliked", prodToRemove)
    }

    function editItem(item){
        console.log("edit btn clicked", item.id)
        setEditProduct(item)
        navigate("/editproducts")
    }

    return (
        <div>
        {getAddProduct?.map((item) =>

            <div key={item.id} className="flex j-space-between pad border gap10">
                <div>
                    <img src={item.image} alt=""/>
                    <h2>{item.title}</h2>
                </div>
                <div className="flex flex-column align-center gap10 pad">
                    <div>Quantity: {item.quantity}</div>
                    <button onClick={() =>deleteProduct(item.id)} className="item-btn del">Delete</button>
                    <button onClick={() =>editItem(item)} className="item-btn edit">Edit</button>
                </div>
            </div>
        )}
        </div>
    );
};

export default AddedProductPage;