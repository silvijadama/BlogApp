import React, {useEffect, useState} from 'react';

const GalleryPage = () => {

    const [getImg, setImg] = useState([])
    const imgGallery = [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
        "https://picsum.photos/203",
        "https://picsum.photos/204",
        "https://picsum.photos/205",
        "https://picsum.photos/206",
        "https://picsum.photos/207",
        "https://picsum.photos/208",
    ]

    useEffect(() => {
        setImg(imgGallery)
    }, []);

    return (
        <div>
            <div className="grid-container pad">
                { getImg.map((item, index)=>
                    <div key={index}>
                        <img src={item} alt=""/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;