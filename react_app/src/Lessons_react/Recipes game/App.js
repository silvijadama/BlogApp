import logo from './logo.svg';
import './App.css';
import {useState, useRef} from "react"
// import * as url from "node:url";
function App() {

    const foodItems = [
        { name: "Apple", emoji: "🍎" },
        { name: "Green Apple", emoji: "🍏" },
        { name: "Pear", emoji: "🍐" },
        { name: "Peach", emoji: "🍑" },
        { name: "Cherries", emoji: "🍒" },
        { name: "Strawberry", emoji: "🍓" },
        { name: "Blueberries", emoji: "🫐" },
        { name: "Kiwi", emoji: "🥝" },
        { name: "Tomato", emoji: "🍅" },
        { name: "Coconut", emoji: "🥥" },
        { name: "Pineapple", emoji: "🍍" },
        { name: "Mango", emoji: "🥭" },
        { name: "Banana", emoji: "🍌" },
        { name: "Watermelon", emoji: "🍉" },
        { name: "Grapes", emoji: "🍇" },
        { name: "Melon", emoji: "🍈" },
        { name: "Lemon", emoji: "🍋" },
        { name: "Avocado", emoji: "🥑" },
        { name: "Carrot", emoji: "🥕" },
        { name: "Corn", emoji: "🌽" },
        { name: "Broccoli", emoji: "🥦" },
        { name: "Cucumber", emoji: "🥒" },
        { name: "Leafy Green", emoji: "🥬" },
        { name: "Potato", emoji: "🥔" },
        { name: "Sweet Potato", emoji: "🍠" },
        { name: "Onion", emoji: "🧅" },
        { name: "Garlic", emoji: "🧄" },
        { name: "Mushroom", emoji: "🍄" },
        { name: "Bread", emoji: "🍞" },
        { name: "Croissant", emoji: "🥐" },
        { name: "Baguette", emoji: "🥖" },
        { name: "Pancakes", emoji: "🥞" },
        { name: "Cheese", emoji: "🧀" },
        { name: "Egg", emoji: "🥚" },
        { name: "Fried Egg", emoji: "🍳" },
        { name: "Bacon", emoji: "🥓" },
        { name: "Steak", emoji: "🥩" },
        { name: "Meat on Bone", emoji: "🍖" },
        { name: "Poultry Leg", emoji: "🍗" },
        { name: "Hot Dog", emoji: "🌭" },
        { name: "Hamburger", emoji: "🍔" },
        { name: "Fries", emoji: "🍟" },
        { name: "Pizza", emoji: "🍕" },
        { name: "Sandwich", emoji: "🥪" },
        { name: "Taco", emoji: "🌮" },
        { name: "Burrito", emoji: "🌯" },
        { name: "Stuffed Flatbread", emoji: "🥙" },
        { name: "Falafel", emoji: "🧆" },
        { name: "Spaghetti", emoji: "🍝" },
        { name: "Ramen", emoji: "🍜" },
        { name: "Curry", emoji: "🍛" },
        { name: "Sushi", emoji: "🍣" },
        { name: "Bento Box", emoji: "🍱" },
        { name: "Dumpling", emoji: "🥟" },
        { name: "Oden", emoji: "🍢" },
        { name: "Shaved Ice", emoji: "🍧" },
        { name: "Ice Cream", emoji: "🍨" },
        { name: "Soft Ice Cream", emoji: "🍦" },
        { name: "Cake", emoji: "🍰" },
        { name: "Shortcake", emoji: "🍰" },
        { name: "Cupcake", emoji: "🧁" },
        { name: "Cookie", emoji: "🍪" },
        { name: "Chocolate", emoji: "🍫" },
        { name: "Candy", emoji: "🍬" },
        { name: "Lollipop", emoji: "🍭" },
        { name: "Custard", emoji: "🍮" },
        { name: "Honey Pot", emoji: "🍯" },
        { name: "Doughnut", emoji: "🍩" },
        { name: "Popcorn", emoji: "🍿" },
        { name: "Beverage Box", emoji: "🧃" },
        { name: "Milk", emoji: "🥛" },
        { name: "Hot Beverage", emoji: "☕" },
        { name: "Teacup", emoji: "🍵" },
        { name: "Sake", emoji: "🍶" },
        { name: "Beer", emoji: "🍺" },
        { name: "Clinking Beers", emoji: "🍻" },
        { name: "Wine Glass", emoji: "🍷" },
        { name: "Tumbler Glass", emoji: "🥃" },
        { name: "Cocktail", emoji: "🍸" },
        { name: "Tropical Drink", emoji: "🍹" },
        { name: "Champagne", emoji: "🍾" }
    ];

    const [getFoodArr, setFoodArr] = useState([])
    const [getNewRecipe, setNewRecipe] = useState([])
    const [getCount, setCount] = useState(0)

    function addProduct(product){
        setFoodArr([...getFoodArr, product])

    }

    function getRandomRecipe(){
        const product = (prod) => Math.floor(Math.random()*prod)
        const amountOfProducts = product(4)+2

        let recipe = []

        for (let i = 0; i < amountOfProducts; i++) {
            const randomItem = foodItems[product(foodItems.length-1)]
            recipe.push(randomItem)
        }
        setNewRecipe(recipe)
        console.log(recipe)
    }

    function clearTableRecipe(){
        let tableArr = []
        setFoodArr(tableArr)
    }

    function countCompletedRecipes(){
        let points = 1

        const recipeName = getNewRecipe.map(item => item.name)
        const tableName = getFoodArr.map(item => item.name)

        let allIncludes =  true

        for (let name of recipeName){
            if (!tableName.includes(name)){
                allIncludes = false
            }
        }

        if(allIncludes){
            setCount(getCount + points)
            clearTableRecipe()
            getRandomRecipe([])
        } else{
            alert ("Products don't match!")
        }
    }



    return (
        <div className="App">
            <h2>Recipe to make</h2>
            <div className="random-recipe">
                {
                    getNewRecipe.map((item, index) => (
                        <div key={index} className="card">{item.emoji}</div>
                    ))
                }
            </div>


            <div className="table">
                <div className="selected-ingredients">
                    {
                        getFoodArr.map((item) =>(
                            <div className="card">{item.emoji}</div>
                        ))
                    }
                </div>
            </div>

            <div className="table">
                <button onClick={countCompletedRecipes}  className="button">complete</button>
                <button onClick={clearTableRecipe} className="button">clear table</button>
                <div className="table-info">Dishes served: {getCount}</div>
            </div>

            <h2>Put ingredients on a table!</h2>

            <div className="ingredient-grid">
                {
                    foodItems.map((product) => (
                        <div key={product.id}
                             onClick={() => addProduct(product)}
                             className="ingredient">{product.emoji}</div>
                    ))
                }
            </div>
            <div className="random-recipe">
                <button className="start-btn" onClick={getRandomRecipe}>Get new recipe!</button>

            </div>
        </div>
    );
}

export default App;

