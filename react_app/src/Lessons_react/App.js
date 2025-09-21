import logo from '../logo.svg';
import '../App.css';
import {useState} from "react"
// import * as url from "node:url";
function App() {


  const [getCookies, setCookies] = useState (0)
  const [getColor, setColor] = useState("pink")
  const [getImage, setImage] = useState("https://150993391.v2.pressablecdn.com/wp-content/uploads/2020/11/Famous-Cookie-Oatmeal-Raisin22-1600x1600-1.png")
  const [getPoints, setPoints] = useState(5)
  const [getAnimation, setAnimation] = useState ("")

  function cookieCounter(){
    setCookies(getCookies + getPoints)
  }
  function twoPoints(){
    if (getCookies >= 20){
      setCookies(getCookies - 20)
      setPoints(2)
    }
  }

  function fourPoints(){
    if (getCookies >= 25){
      setCookies(getCookies - 25)
      setPoints(4)
    }
  }

  function changeColor(){
    if(getCookies >= 30)
      setCookies(getCookies - 30)
      setColor("blue")
  }

  function changeImage(){
    if(getCookies >= 40)
      setCookies(getCookies - 40)
    setImage("https://upload.wikimedia.org/wikipedia/commons/7/70/Cookie.png")
  }

  function makeSpin(){
    if(getCookies >= 35)
      setCookies(getCookies - 35)
      setAnimation("spin")
  }


  return (
      <div className="App">
        <div className="container flex gap10 pad j-space-evenly">
          <div>
            <div className="circle flex" style={{backgroundColor: getColor}}>
              <img onClick={cookieCounter} className={`cookie ${getAnimation}`}
                   src={getImage}/>
            </div>
            <h3>Cookies: {getCookies}</h3>
          </div>
          <div className="upgrade">
            <div onClick={twoPoints} className="upgrade1 item">2 points per click = 20$</div>
            <div onClick={fourPoints} className="upgrade2 item">4 points per click = 25$</div>
            <div onClick={changeImage} className="upgrade3 item">change cookie image = 40$</div>
            <div onClick={changeColor} className="upgrade4 item">Change game bg-color = 30$</div>
            <div onClick={makeSpin} className="upgrade5 item">make cookie spin = 35$</div>
          </div>
        </div>
      </div>
        );
        }

        export default App;
