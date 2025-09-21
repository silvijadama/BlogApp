import React from 'react';
import {useParams} from "react-router-dom";

const AboutPage = () => {

    const params =useParams()
    return (
        <div>
            <div className="container"
                 style={{backgroundColor: params.background}}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam doloribus, earum fugit
                    itaque, molestias mollitia nam numquam perferendis placeat quo, similique sint sit sunt voluptas!
                    Atque cum labore nam!
                </p>
                <br/>
                <p>Accusamus adipisci corporis deleniti, fuga, fugiat, id iusto obcaecati quidem quo repellendus sed
                    tempore vel vitae? Animi aut consequatur distinctio, eius esse fugit harum maiores nemo nesciunt
                    numquam tempora voluptas.
                </p>
                <br/>
                <p>Asperiores, atque cumque doloribus harum impedit in, iste labore molestiae numquam praesentium,
                    quam repudiandae veniam. Ab alias aliquid aut consequuntur debitis hic similique, velit? Doloremque,
                    eligendi, incidunt? Doloribus nesciunt, optio.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;