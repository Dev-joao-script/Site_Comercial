import React from 'react'
import configData from "../config/configData.json";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const produto = () => {

/*     const urlConfig = configData.Url.Produtos.toString(); */
    const {id} = useParams();

    return (
        <div>
            {/* header */}
            <Header component="false"/>
            {/* nav */}
            <Navbar/>
            {/* imagens do produto */}
            <p>id do produto {id}</p>
            {/* sobre o produto */}
            {/* preco e condições de pagamento */}
            {/* botões */}
            {/* Avaliações */}
            {/* comentarios */}
            {/* Estoque */}
            {/* Likes */}
        </div>
    )
}

export default produto