import { useEffect, useState, useRef } from 'react';
import style from './CarrousselSales.css';
import { useFetch } from '../hook/useFetch.js';
import imgError from '../assets/erro.gif';
import imgLoad from '../assets/load.gif';

const CarrousselSales = ({ props: url }) => {
    
    const [itens, setItens] = useState(null);
    const [maxItens, setMaxItens] = useState(0);
    const [currentIten, setCurrentIten] = useState(1);
    let [selected] = useState("iten-sales current-iten-sales");
    let [unselected] = useState("iten-sales");
    const selectedReference = useRef();
    let MINUTE_MS = 7000;
    const { data, load: load_sales, error: error_sales } = useFetch(url);

    useEffect(() => {
        const handleCarrousel = async () => {
            if (data) {
                setItens(data);
                setMaxItens(data.length);
                console.log(data);
                setCurrentIten(1)
            } else {
                setItens(null);
                setMaxItens(0);
            }
        }
        handleCarrousel();

    }, [data]);

    useEffect(() => {
        const updateiten = () => {
            if (currentIten > maxItens) {
                setCurrentIten(1);
            } else if (currentIten < 1) {
                setCurrentIten(maxItens);
            }
        }
        updateiten();
    }, [currentIten, maxItens]);

    useEffect(() => {
        const carrousselroll = setInterval(() => {
            setCurrentIten(currentIten + 1);
        }, MINUTE_MS);
        return () => clearTimeout(carrousselroll);
    }, [currentIten, MINUTE_MS])

    return (
        <>
        {error_sales ? (<p> <img src={imgError} alt="error" style={{ width: "50px" }} />  {error_sales}</p>) : (
            load_sales ? (<img src={imgLoad} alt="Loading" style={{ width: "50px" }} />) : (
                <div className="container-sales" style={style}>
                <div className='gallery-wrapper-sales'>
                    <div className='gallery-sales'>
                        {itens && itens.map((p) => (
                            <div key={p.id} ref={p.id === currentIten ? selectedReference : null} 
                            className={p.id === currentIten ? selected : unselected}>
                                <img src={"../sales/" + p.img} alt="promotions" style={{"borderRadius": "20px"}}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            )
        )}
    </>
    )
}

export default CarrousselSales
