
import './App.css';
import React, {useEffect, useState} from "react"
import CardQuestionsAnswers from "./Lessons_react/CAO REACT/fetch practise/Card_Questions_answers";

function App() {
    const [getData, setData] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data =>{
                console.log(data, "all data")
                setData(data.results)
            })
    }, []);


    return (
        <div className="App gap10">
            {getData.map((item, index)=>
                <CardQuestionsAnswers
                    key={index}
                    card={item}/>
            )}


        </div>
    );
}

export default App;

