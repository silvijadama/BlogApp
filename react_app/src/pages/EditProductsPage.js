import React from 'react';

const EditProductsPage = ({products, getSelectedProduct, setSelectedProduct,
                            getQuantity, setQuantity, getEditProduct, setEditProduct, getBgColor, setBgColor}) => {

    function quantityCounter(e) {
        setQuantity(() =>{
            const updatedQuantity = Number(e.target.value)
            console.log(updatedQuantity)
            return updatedQuantity
        })
    }

    function update(){

        // First, lets update current edit product state
        const updatedProducts = {
            image: getEditProduct.image,
            title: getEditProduct.title,
            quantity: Number(getQuantity),
            id: getEditProduct.id,
            color: getBgColor
        }
        setEditProduct(updatedProducts)

        // Second, update shopping cart with updated state
        // Remove previous edit product, and add updated product


        // setEditProduct((prev) => {
        //     const editedProd = [...prev, updatedProducts];
        //     console.log("edited products", editedProd);
        //     return editedProd
        //  })
    }


    return (
        <div>
            <div className="container"
                 style={{ backgroundColor: getBgColor }} >
                <h2>EDIT ITEM PAGE</h2>

                <div>Selected Product: {getEditProduct.title}</div>

                <div>
                        <div className="flex j-space-between pad border gap10">
                            <div>
                                <img src={getEditProduct.image} alt=""/>
                                <h2>{getEditProduct.title}</h2>
                            </div>
                            <div className="flex flex-column align-center gap10 pad">
                                <div>Quantity: {getEditProduct.quantity}</div>
                            </div>
                        </div>
                </div>

                <input type="color" value={getBgColor}
                       onChange={(e) => setBgColor(e.target.value)} />
                <input onChange={quantityCounter} type="number" placeholder="QUANTITY" className="input-field"/>

                <button onClick={update} className="add-btn">UPDATE</button>

            </div>
        </div>
    );
};

export default EditProductsPage;