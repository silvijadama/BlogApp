import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useStore} from "../../store/store";

const AllProductsPage = ({setItems, getItems, loggedUser}) => {

    const setReservedItems = useStore((state) => state.setReservedItems)
    const setAvailableMoney = useStore((state) => state.setAvailableMoney)
    const availableMoney = useStore(state => state.availableMoney)
    const reserved = useStore((state) => state.reserved)
    const navigate = useNavigate()



    useEffect(() => {
        if (!loggedUser){
            return
        }
        fetch(`http://localhost:2500/api/allproducts`)
            .then(res => res.json())
            .then(data =>{
                    setItems(data.items)
                    console.log("all items is allProductPage",data.items)


                    const currentlyReservedItems = data.items.filter(item => item.reservedBy === loggedUser.id)
                    console.log(currentlyReservedItems, "currently reserved items")

                    setReservedItems(currentlyReservedItems)

                    let moneyLeft = calculateMoney(200, currentlyReservedItems)
                    setAvailableMoney(moneyLeft)


                }
            )
    }, [setItems, loggedUser]);

    if (!loggedUser){
        console.log("no logged user")
        return
    }

    function calculateMoney(initialMoney, reserved){
        let reservedItemsPrice = 0
        reserved.forEach(item => {
            reservedItemsPrice += item.price
        })
        return initialMoney - reservedItemsPrice

    }
    function reserveProduct(itemId){
        fetch("http://localhost:2500/api/reserve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({ itemId })
        })
            .then(res => res.json())
            .then(data => {

                if(data.success){
                    const reservedItem = data.item
                    console.log(reservedItem, "This is reserved item's data", reservedItem.price)
                    setItems(prev =>
                    prev.map(item => item._id === itemId ? {...item, reservedBy: loggedUser.id} : item))

                    setReservedItems(getItems.filter(item => item.reservedBy === loggedUser.id || item._id === itemId))

                    if(availableMoney <= reservedItem.price){
                        alert("Not enough money")
                        return
                    }

                    let moneyLeft = calculateMoney(200, [...reserved, reservedItem])
                    setAvailableMoney(moneyLeft)
                    // setAvailableMoney(availableMoney - reservedItem.price)
                }
            })
    }

    return (
        <div>
            <div className="grid-container">

                <div className="post-card border pad">
                    <img src="https://www.barkershoes.com/cdn/shop/collections/8I5A5326_600x375_crop_center.jpg?v=1618574799" alt="Post Image" className="post-image"/>
                    <div className="post-content">
                        <h2 className="post-title">Shoes</h2>
                        <p className="post-description">40 $</p>
                            <button
                                className="btn-del gap10"
                                onClick={reserveProduct}>Reserve Product</button>
                    </div>
                </div>

                {getItems.map((item, _id)=>
                    <div className="post-card border pad"  key={_id}>
                        <img src={item.image} alt="Post Image" className="post-image"/>
                        <div className="post-content">
                            <h2 className="post-title">{item.title}</h2>
                            <p className="post-description">{item.price} $</p>
                                <button
                                    className={`btn-del gap10 ${item.reservedBy ? "btn-disabled" : ""}`}
                                    disabled={!!item.reservedBy}
                                    onClick={() => reserveProduct(item._id)}>{item.reservedBy ? "Reserved" : "Reserve Product"}</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllProductsPage;