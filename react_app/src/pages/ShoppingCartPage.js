import React from 'react';
import CartItemComponent from "../components/CartItemComponent";
import {useStore} from "../store/store";


const ShoppingCartPage = () => {

    const cart = useStore((state) => state.cart)

    function total(){
        let sum = 0
        cart.map(item =>{
            sum += item.price
        })
        return sum
    }


    return (
        <div>
            <CartItemComponent/>

                <div className="flex j-end pad">
                    <button className="add-btn">Total: {total()}$</button>
                </div>
        </div>
    );
};

export default ShoppingCartPage;