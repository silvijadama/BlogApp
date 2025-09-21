import React from 'react';
import {useStore} from "../store/store";

const CartItemComponent = () => {

    const cart = useStore((state) => state.cart)

    function remove(index){
        useStore.setState({
            cart: cart.filter((_, i) => i !== index)
        });
    }

    return (
        <div className="pad">
            {cart.length === 0 && <p>Your cart is empty.</p>}
            {cart.map((item, index) =>

                <div key={index} className="bg-color flex j-space-between border pad gap10 margin-btm">
                    <div className="flex pad gap10 ">
                        <div>
                            <img src={item.image} alt=""/>
                        </div>
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.price} $</p>
                        </div>
                    </div>

                    <div className="flex align-center j-center pad">
                        <button onClick={()=> remove(index)} className="btn-del">Remove</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CartItemComponent;