import React, {useEffect, useState, useRef} from "react";
import {withRouter} from "react-router-dom";
import {withUser} from "../utilidades/Auth";
import {DataView} from "primereact/dataview";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import {buscar, excluir, json, salvar} from "../utilidades/Fetch";
import { Toast } from 'primereact/toast';


import img1 from "../img/avatar/1.png";
import img2 from "../img/avatar/2.png";
import img3 from "../img/avatar/3.png";
import img4 from "../img/avatar/4.png";
import img5 from "../img/avatar/5.png";
import img6 from "../img/avatar/6.png";
import img7 from "../img/avatar/7.png";
import img8 from "../img/avatar/8.png";
import img9 from "../img/avatar/9.png";
import img10 from "../img/avatar/10.png";
import img11 from "../img/avatar/11.png";
import img12 from "../img/avatar/12.png";
import img13 from "../img/avatar/13.png";
import img14 from "../img/avatar/14.png";
//import img15 from "../img/avatar/15.png";
import img16 from "../img/avatar/16.png";
import img17 from "../img/avatar/17.png";
import img18 from "../img/avatar/18.png";
import img19 from "../img/avatar/19.png";
import img20 from "../img/avatar/20.png";
import img21 from "../img/avatar/21.png";
import img22 from "../img/avatar/22.png";
import img23 from "../img/avatar/23.png";
import img24 from "../img/avatar/24.png";
import img25 from "../img/avatar/25.png";
import img26 from "../img/avatar/26.png";
import img27 from "../img/avatar/27.png";
import img28 from "../img/avatar/28.png";
import img29 from "../img/avatar/29.png";
import img30 from "../img/avatar/30.png";


const images = [
    {id: 1, picture: img1, preco: 0},
    {id: 2, picture: img2, preco: 2},
    {id: 3, picture: img3, preco: 5},
    {id: 4, picture: img4, preco: 5},
    {id: 5, picture: img5, preco: 1},
    {id: 6, picture: img6, preco: 10},
    {id: 7, picture: img7, preco: 10},
    {id: 8, picture: img8, preco: 10},
    {id: 9, picture: img9, preco: 15},
    {id: 10, picture: img10, preco: 15},
    {id: 11, picture: img11, preco: 15},
    {id: 12, picture: img12, preco: 15},
    {id: 13, picture: img13, preco: 15},
    {id: 14, picture: img14, preco: 15},
   // {id: 15, picture: img15, preco: 20},
    {id: 16, picture: img16, preco: 20},
    {id: 17, picture: img17, preco: 20},
    {id: 18, picture: img18, preco: 10},
    {id: 19, picture: img19, preco: 10},
    {id: 20, picture: img20, preco: 10},
    {id: 21, picture: img21, preco: 10},
    {id: 22, picture: img22, preco: 10},
    {id: 23, picture: img23, preco: 10},
    {id: 24, picture: img24, preco: 15},
    {id: 25, picture: img25, preco: 10},
    {id: 26, picture: img26, preco: 15},
    {id: 27, picture: img27, preco: 10},
    {id: 28, picture: img28, preco: 5},
    {id: 29, picture: img29, preco: 20},
    {id: 30, picture: img30, preco: 20},

];


export const PageLoja = withUser(withRouter(props => {
   
    const [inventarios, setInventarios] = useState([]);
    const [iditem, setIditem] = useState(1);
        
    useEffect(() => {
        buscar(`/inventarios?usuario.id==${props.usuario.id}`).then(json).then(setInventarios);
    }, []);
  
    function verificaCash() {              
        console.log(iditem);
        var itemSelecionado = images.filter(i => i.id === iditem)[0];         
        if(itemSelecionado.preco <= props.usuario.cash){           
            inventarios[0].itens.push(itemSelecionado);
            showConfirm();
            //handleSalvar();
        } else{
            window.alert("Cash insuficiente");            
        }
    }

    const handleSalvar = () => {         
        salvar("/inventarios", inventarios[0]).then(handleVoltar); 
        window.location.reload();       
    }

    const handleVoltar = () => window.location.reload();
   
    function itemTemplate(image) {
        return (
            <div className="p-col-3 imagem-template">
                <div><h4>Número Figurinha: {image.id}</h4></div>
                <div><img className="imagem-loja" src={image.picture} alt=""/></div>
                <div><h4>Cash: {image.preco}</h4></div>               
            </div>
        );}   

    const notOwned = images.filter(i => !inventarios[0]?.itens.some(v => v.id === i.id));        
    
    const toastBC = useRef();  

    const showConfirm = () => {
        toastBC.current.show({ severity: 'warn', sticky: true, content: (
            <div className="p-flex p-flex-column" style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h4>Confirmar compra do item: {iditem}?</h4>                                       
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-6">
                        <Button type="button" label="Sim" className="p-button-success" onClick={handleSalvar}/>
                    </div>
                    <div className="p-col-6">
                        <Button type="button" label="Não" className="p-button-secondary" onClick={handleVoltar}/>
                    </div>
                </div>
            </div>
        ) });
    }   
    

   	return (
        <div className="p-grid">
            <Toast ref={toastBC} position="bottom-center" />
            <div className="p-col-8">
                <DataView layout="grid" value={notOwned} itemTemplate={itemTemplate}/>
            </div>
            <div className="p-col-3 p-ml-6 p-mt-6">
                <h3>Insira Número da Figura</h3>
                <InputNumber value={iditem} onValueChange={e => setIditem(e.value)} />              
                <Button label="Comprar" className="p-col-7 p-ml-5 p-mt-4" icon="pi pi-dollar" onClick={verificaCash}/>                                              
            </div>            
        </div>      

    );       
}));

