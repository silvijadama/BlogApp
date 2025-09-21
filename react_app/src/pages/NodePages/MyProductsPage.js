import React, {useEffect, useState} from 'react';
import {useStore} from "../../store/store";

function totalAmountReserved(initialMoney, reservedItems){
    let initialTotalPrice = 0
    reservedItems.forEach(item => {
        initialTotalPrice += item.price
    })
    return initialMoney + initialTotalPrice

}

function calculateMoneyLeftWithForEach(initialMoney, reservedItems){
    let reservedPrice = 0
    reservedItems.forEach(item => {
        reservedPrice += item.price
    })
    return initialMoney - reservedPrice
}

const MyProductsPage = () => {
    const setAvailableMoney = useStore((state) => state.setAvailableMoney)
    const setReservedMoney = useStore((state) => state.setReservedMoney)
    const setReservedItems = useStore((state) => state.setReservedItems)
    const availableMoney = useStore(state => state.availableMoney)
    const reserved = useStore((state) => state.reserved)
    const reservedMoney = useStore(state => state.reservedMoney)

    useEffect(() => {
        fetch("http://localhost:2500/api/myproducts", {
            headers: {authorization: localStorage.getItem("token")}
        })
            .then(res => res.json())
            .then(data => {
                setReservedItems(data.items)
                console.log(data.items, "my reserved items")


                let moneyLeft = calculateMoneyLeftWithForEach(200, data.items)
                setAvailableMoney(moneyLeft)

                let totalReservedMoney = totalAmountReserved(0, data.items)
                setReservedMoney(totalReservedMoney)
            })
    }, []);

        function cancelRes(itemId) {
            fetch("http://localhost:2500/api/cancel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({itemId})
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {

                        const canceledItem = data.item
                        console.log(canceledItem, "this item's reservation has benn canceled")

                        setReservedItems(reserved.filter(item => item._id !== itemId))

                        setAvailableMoney( availableMoney + canceledItem.price)
                        setReservedMoney( reservedMoney - canceledItem.price)
                    }
                })
        }

    console.log(reserved)

    return (
        <div>
            <div className="pad border margin-btm">Total amount reserved: {reservedMoney} $</div>

            <div className="grid-container">
                {reserved.map(item =>(
                    <div className="post-card border pad" key={item._id}>
                        <img src={item.image} alt="Post Image" className="post-image"/>
                        <div className="post-content">
                            <h2 className="post-title">{item.title}</h2>
                            <p className="post-description">{item.price} $</p>
                            <button
                                className="btn-del gap10"
                                onClick={() =>cancelRes(item._id)}>Cancel reservation</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyProductsPage;