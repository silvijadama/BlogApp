
import logo from './logo.svg';
import './App.css';
import {useState, useRef} from "react"
// import * as url from "node:url";
function App() {

    const fruits = [
        { id: "frt_a1b2", name: "Apple", emoji: "🍎" },
        { id: "frt_k9x4", name: "Banana", emoji: "🍌" },
        { id: "frt_u7n8", name: "Grapes", emoji: "🍇" },
        { id: "frt_z3q1", name: "Watermelon", emoji: "🍉" },
        { id: "frt_m6r5", name: "Pineapple", emoji: "🍍" },
        { id: "frt_t8j2", name: "Peach", emoji: "🍑" },
        { id: "frt_v4p9", name: "Cherry", emoji: "🍒" },
        { id: "frt_x1w6", name: "Strawberry", emoji: "🍓" },
        { id: "frt_y7l0", name: "Lemon", emoji: "🍋" },
        { id: "frt_n2d3", name: "Kiwi", emoji: "🥝" }
    ];

    const [getFruitArr, setFruitArr] = useState([])

    function addFruit(fruit){
        setFruitArr( [...getFruitArr, fruit])
    }

    function deleteFruit(index){
        let newArr = getFruitArr.filter((fruit, i) => i !== index)
        setFruitArr(newArr)

    }

    return (
        <div className="App">
            <div className="container">

                <div className="card">
                    <h3>FRUITS LIST</h3>
                    <div className="grid">
                        {
                            fruits.map((fruit) => (
                                <div
                                    key={fruit.id}
                                    onClick={() =>addFruit(fruit)}
                                    className="fruit-icon">
                                    {fruit.emoji}
                                </div>
                            ))
                        }

                    </div>
                </div>

                <div className="card">
                    <h3>OTHER FRUITS LIST</h3>
                    <div className="list">
                        {
                            getFruitArr.map((item, index) =>(
                                <div  className="list-item">
                                    <span className="icon">{item.emoji}</span>
                                    <span className="name">{item.name}</span>
                                    <span key={item.id} onClick={() => deleteFruit(index)} className="delete">X</span>
                                </div>
                            ))}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default App;

