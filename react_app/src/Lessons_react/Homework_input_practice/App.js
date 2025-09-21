import logo from './logo.svg';
import './App.css';
import {useState, useRef} from "react"
// import * as url from "node:url";
function App() {

    ///////toolbar/////////

    const toolCol  = useRef()
    const [getColor, setColor] = useState ("")
    const toolImg = useRef()
    const [getImg, setImg] = useState("https://media.istockphoto.com/id/1145393791/vector/farm-animals-sign.jpg?s=612x612&w=0&k=20&c=TkDlbOcvUb6d7jGpZtmzlFNqYhPNGiakfPVnJCL9H6c=")
    const toolLinkName = useRef()
    const [getLink, setLink] = useState("")

    function updateToolbarCol(){
        setColor(toolCol.current.value)
    }
    function updateToolbarImg(){
        setImg(toolImg.current.value)
    }
    function addNewLink(){
        setLink(toolLinkName.current.value)
    }

/////////////////sidebar///////////////

    const sideCol = useRef()
    const [getSideCol, setSideCol] = useState("")
    const sideLinkInp = useRef()
    const [getSideLink, setSideLink] = useState([])

    function updateSidebarCol(){
        setSideCol(sideCol.current.value)
    }
    function addSideLink(){
        const newSideLink= {
            link: sideLinkInp.current.value
        }

        setSideLink([...getSideLink, newSideLink])
    }

    //////////// posts ///////////////////

    const postImgInp = useRef()
    const postTitleInp = useRef()
    const postColorInp = useRef()
    const [getPostArr, setPostArr] = useState([])

    function createNewPost(){
        const newPost = {
            image: (postImgInp.current.value),
            title: (postTitleInp.current.value),
            color: (postColorInp.current.value)
        }
        setPostArr([...getPostArr, newPost])
    }

    //////////footer//////////

    const footerTxtInp = useRef()
    const footerColInp = useRef()
    const [getFooterTxt, setFooterTxt] = useState("This is footer")
    const [getFooterCol, setFooterCol] = useState("")

    function updateFooter(){
        setFooterTxt(footerTxtInp.current.value)
        setFooterCol(footerColInp.current.value)
    }


    return (
        <div className="App">
            <div className="container flex gap10">
                <div className="grow1 border flex flex-column pad">
                    {/*TOOLBAR*/}

                    <h3 className="pad txt-align">TOOLBAR</h3>
                    <div className="grow1 border flex flex-column j-space-evenly pad color1">
                        <div className="flex gap10">
                            <input className="toolbar-input" type="color" ref={toolCol}/>
                            <button onClick={updateToolbarCol} className="btn toolbar-btn">Set</button>
                        </div>
                        <div>
                            <input className="toolbar-input" type="text" placeholder="Logo image" ref={toolImg}/>
                            <button onClick={updateToolbarImg} className="btn toolbar-btn">Set</button>
                        </div>
                        <div>
                            <input className="toolbar-input" type="text" placeholder="Link name" ref={toolLinkName}/>
                            <button onClick={addNewLink} className="btn toolbar-btn">Add</button>
                        </div>
                    </div>

                    {/*// <!-- ///////////// SIDEBAR////////////////-->*/}

                    <h3 className="pad txt-align">SIDEBAR</h3>
                    <div className="grow1 border flex flex-column j-space-evenly pad color1">
                        <div>
                            <input className="sidebar-input" type="color" ref={sideCol}/>
                            <button onClick={updateSidebarCol} className="btn sidebar-btn">Set</button>
                        </div>
                        <div>
                            <input className="sidebar-input" type="text" placeholder="Link name" ref={sideLinkInp}/>
                            <button onClick={addSideLink} className="btn sidebar-btn">Add</button>
                        </div>
                    </div>

                    {/*// <!--////////////////////// POSTS /////////////////-->*/}

                    <h3 className="pad txt-align">POSTS</h3>
                    <div className="grow1 border flex flex-column j-center pad gap10 color1">
                        <div>
                            <input className="post-input" type="text" placeholder="Image" ref={postImgInp}/>
                        </div>
                        <div>
                            <input className="post-input" type="text" placeholder="Title" ref={postTitleInp}/>
                        </div>
                        <div>
                            <input className="post-input" type="color" ref={postColorInp}/>
                        </div>
                        <div>
                            <button onClick={createNewPost} className="btn post-btn">Add post</button>
                        </div>
                    </div>

                    {/*// <!--        ///////////////////// FOOTER /////////////////-->*/}

                    <h3 className="pad txt-align">FOOTER</h3>
                    <div className="grow1 border flex flex-column j-space-evenly gap10 pad color1">
                        <div>
                            <input className="footer-input" type="text" placeholder="Footer text" ref={footerTxtInp} required/>
                        </div>
                        <div>
                            <input className="footer-input" type="color" ref={footerColInp} required/>
                        </div>
                        <div>
                            <button onClick={updateFooter} className="btn footer-btn">Set footer</button>
                        </div>
                    </div>
                </div>

                {/*// <!--    /////////////////// MAIN TOOLBAR/////////////-->*/}

                <div className="main grow3 border pad">
                    <div className="main-toolbar flex pad gap10 j-space-between border margin-btm color1 align-center"
                         style={{backgroundColor: getColor}}>
                        <div>
                            <img className="logo-image"
                                 src={getImg}
                                 alt="LOGO" width="60px"/>
                        </div>
                        <div className="toolbar-links">
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">{getLink}</a>
                        </div>
                    </div>

                    {/*// <!--        ///////////   CONTENT ///////////////-->*/}

                    <div className="main flex pad gap10 margin-btm">
                        <div className="main-sidebar grow1 border flex flex-column pad gap10 color1"
                             style={{backgroundColor: getSideCol}}>
                            { getSideLink.map(item =>
                                <a href="#">{item.link}</a>
                            )}
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>

                        </div>
                        <div className="card grow3 flex gap10">
                            {
                                getPostArr.map(item =>(
                                    <div className="card-BG  border flex-column flex pad align-center color1"
                                         style={{backgroundColor: item.color}}>
                                        <img className=" card-img border"
                                             src={item.image}
                                             alt="" width="100%"/>
                                        <h3 className="card-title">{item.title}</h3>
                                    </div>
                                ))}

                            <div className="card-BG border flex-column flex pad align-center color1">
                                <img className="card-img border"
                                     src="https://scx2.b-cdn.net/gfx/news/hires/2017/1-mouselemursm.jpg" alt=""
                                     width="100%"/>
                                <h3 className="card-title">Mouse Lemur</h3>
                            </div>
                        </div>
                    </div>

                    {/*// <!--        //////////   FOOTER ///////////////-->*/}

                    <div className="footer txt-align border pad color1"
                         style={{backgroundColor: getFooterCol}}>{getFooterTxt}</div>
                </div>

            </div>
        </div>
    );
}

export default App;

