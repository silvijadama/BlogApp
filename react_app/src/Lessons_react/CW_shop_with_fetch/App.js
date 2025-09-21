import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect} from "react"
// import * as url from "node:url";
import Product from "./components/Product";
import Product_Remove from "./components/Product_Remove";

function App() {

    const [getData, setData] = useState([])
    const [getCard, setCard] = useState([])

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                setData(data)
            })
    }, []);

    function addCard(cardData){
        setCard([...getCard, cardData])
    }

    ////cardData = props.product

    function removeItem(index){
        let cardToRemove = getCard.filter((item, i) => i !== index)
        setCard(cardToRemove)
    }

    return (
        <div className="App flex gap10">
            <div className="grid-container">
                {
                    getData.map((item, index) =>
                        <Product
                            key={index}
                            product={item}
                            addCard={addCard}/>
                    )
                }
            </div>
            <div className="flex-container border pad">
                {
                    getCard.map((item, index) =>
                        <Product_Remove
                            key={index}
                            product={item}
                            removeItem={() => removeItem(index)}/>
                    )
                }
            </div>
        </div>
    );
}

export default App;

