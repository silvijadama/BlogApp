import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

    const AllProductsPage = ({products,
                             getSelectedProduct, setSelectedProduct,
                             getQuantity, setQuantity,
                             setAddProduct, getAddProduct}) => {

    const navigate = useNavigate()

    function quantityCounter(e) {
        setQuantity(() =>{
         const updatedQuantity = Number(e.target.value)
            console.log(updatedQuantity)
            return updatedQuantity
        })
    }

    function addSingleProduct(){

        const singleProduct = {
            image: getSelectedProduct.image,
            title: getSelectedProduct.title,
            quantity: Number(getQuantity),
            id: getSelectedProduct.id
        }

        setAddProduct((kiaule) => {
            const updated = [...kiaule, singleProduct];
            console.log("selected products", updated);
            return updated
        })

        navigate("/addedproducts")
    }

        console.log("home page", getAddProduct)
    return (
        <div>
            <div className="container">
                <h2>ADD ITEM PAGE</h2>

                <label className="select-label">select icon</label>
                <div className="icon-grid">
                    {products?.map((prod)=>
                        <div key={prod.id}
                             onClick={() => setSelectedProduct(prod)} className="icon">
                        <img src={prod.image} alt=""/>
                        </div>
                        )}

                </div>

                <div>Title: {getSelectedProduct.title}</div>
                <input onChange={quantityCounter} type="number" placeholder="QUANTITY" className="input-field"/>

                <button onClick={addSingleProduct} className="add-btn">ADD</button>

            </div>
        </div>
    );
};

export default AllProductsPage;