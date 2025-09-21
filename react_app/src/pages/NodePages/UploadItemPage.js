import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";

const UploadItemPage = ({loggedUser}) => {

    const imageInput = useRef()
    const titleInput = useRef()
    const priceInput = useRef()
    const navigate = useNavigate()

     function uploadItem(){
         const newItem ={
             image: imageInput.current.value,
             title: titleInput.current.value,
             price: priceInput.current.value,
             user_id: loggedUser.id

         }
         console.log(newItem, "log new Item data")

         fetch("http://localhost:2500/api/upload", {
             method: "POST",
             headers: { "Content-Type": "application/json",
                 "authorization": localStorage.getItem("token")},
             body: JSON.stringify(newItem)
         })
             .then(res => res.json())
             .then(data => {
                 console.log("Upload new item", data);
                 navigate("/api/allproducts")
             });

     }


    return (
        <div className="flex flex-column align-center gap10 pad border">
            <input type="text" placeholder="image url" ref={imageInput}/>
            <input type="text" placeholder="title" ref={titleInput}/>
            <input type="text" placeholder="price" ref={priceInput}/>
            <div onClick={uploadItem} className="btn">Upload product</div>
        </div>
    )
};

export default UploadItemPage;