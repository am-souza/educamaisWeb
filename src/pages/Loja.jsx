import React from "react";
import {withRouter} from "react-router-dom";
import {DataView} from "primereact/dataview";

import img1 from "../img/avatar/1.png";
import img2 from "../img/avatar/2.png";
import img3 from "../img/avatar/3.png";
import img4 from "../img/avatar/4.png";
import img5 from "../img/avatar/5.png";
import img6 from "../img/avatar/6.png";
import img7 from "../img/avatar/7.png";
import { Button } from "primereact/button";

const images = [
    {id: 1, picture: img1, preco: 20},
    {id: 2, picture: img2, preco: 15},
    {id: 3, picture: img3, preco: 30},
    {id: 4, picture: img4, preco: 1000},
    {id: 5, picture: img5, preco: 45},
    {id: 6, picture: img6, preco: 60},
    {id: 7, picture: img7, preco: 20}
];

export const PageLoja = withRouter((props) => {
    function itemTemplate(image) {
        return (
            <div className="p-col-2 imagem-template">
                <div>{image.id}</div>
                <div><img className="imagem-loja" src={image.picture} alt=""/></div>
                <div>Cash: {image.preco}</div>
                <Button label="Comprar" icon="pi pi-dollar"/>
            </div>
        );
    }
	return (
        <DataView layout="grid" value={images} itemTemplate={itemTemplate}/>
    );
});
