import logo from '../logo.svg';
import '../App.css';
import {useState, useRef} from "react"
// import * as url from "node:url";
function App() {

    const colorRef = useRef()
    const userRef = useRef()
    const [getArr, setArr] = useState ([])
    const cars = [
        {
            make: "Toyota",
            model: "Camry",
            year: 2021,
            color: "Silver",
            mileage: 23000,
            isElectric: false
        },
        {
            make: "Tesla",
            model: "Model 3",
            year: 2023,
            color: "Red",
            mileage: 12000,
            isElectric: true
        },
        {
            make: "Ford",
            model: "F-150",
            year: 2020,
            color: "Blue",
            mileage: 45000,
            isElectric: false
        },
        {
            make: "BMW",
            model: "i4",
            year: 2022,
            color: "Black",
            mileage: 15000,
            isElectric: true
        },
        {
            make: "Honda",
            model: "Civic",
            year: 2019,
            color: "White",
            mileage: 60000,
            isElectric: false
        }
    ];

    function createObj(){

        const user= {
            color: (colorRef.current.value) ,
            userName: (userRef.current.value)
        }

        setArr([...getArr, user])

    }

    return (
        <div className="App">
            <div className="flex flex-column align-center gap pad">
                <div>
                    <div className="flex flex-column j-start gap pad" >
                        {
                            getArr.map((item) =>(
                                <div className={"flex"}>
                                    <div className="circle" style={{ backgroundColor: item.color }} ></div>
                                    <h2>{item.userName}</h2>
                                </div>
                            ))}

                    </div>
                </div>
                <label htmlFor="colorPikcer">Pick color</label>
                <input type="color" ref={colorRef} id="colorPikcer"/>
                <input type="text" ref={userRef} placeholder="Username"/>
                <button onClick={createObj} className={"btn"}>Set Color</button>
            </div>
        </div>
    );
}

export default App;

