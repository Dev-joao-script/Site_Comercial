import configData from "../config/configData.json";
import React from 'react'
import style from './Header.css'
import { useState, useEffect } from 'react'
import logoSelf from '../assets/logo4.png'
import CarrousselSales from '../components/CarrousselSales';

const Header = ({ component }) => {
    const Purl = configData.Url.Promoções.toString();
    const [url, setUrl] = useState(Purl);
    const [componente, setComponent] = useState(component);

    useEffect(() => {
        const loadHeader = async () => {
            setUrl(Purl);
            setComponent(componente)
        }
        loadHeader();
    }, [Purl, componente])

    return (
        <div style={style} className={componente ? "header-sales" : "header" }>
            {componente && <img src={logoSelf} alt="logo" className='logo' />}
            {componente && <div className='promotional'>
                {<CarrousselSales props={url} />}
            </div>}
        </div>
    )
}

export default Header