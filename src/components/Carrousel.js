import configData from "../config/configData.json";
import { useEffect, useState, useRef } from 'react'
import { useFetch } from '../hook/useFetch.js';
import carrouselStyle from './carrousel.css'
import next from '../assets/next.png'
import Like from '../assets/like.png'
import Unlike from '../assets/unlike.png'
import preview from '../assets/preview.png'
import Card from './Card';
import imgError from '../assets/erro.gif';
import imgLoad from '../assets/load.gif';
import { Link } from 'react-router-dom'

const Carrousel = ({ props: Type }) => {

    let urlConfig = configData.Url.Produtos.toString();
    const [urlProducts, setUrlProducts] = useState("");
    const { data, load, error } = useFetch(urlProducts);

    const [itens, setItens] = useState(null);
    const [maxItens, setMaxItens] = useState(0);
    const [currentIten, setCurrentIten] = useState(1);
    let [selected] = useState("iten current-iten");
    let [unselected] = useState("iten");
    const selectedReference = useRef();
    let MINUTE_MS = 5000;

    useEffect(() =>{
        const selectCategori = () =>{
           switch (Type) {
            case "all":
                setUrlProducts(urlConfig);
                break;
                case Type !== "all":
                setUrlProducts(`${urlConfig}/${Type}`);
                break;
            default:
                setUrlProducts(urlConfig);
                break;
           }
        }
        selectCategori();
    },[Type, urlConfig])

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
            } else if(currentIten < 1) {
                setCurrentIten(maxItens);
            }
        }
        updateiten();
    }, [currentIten, maxItens]);

    const handleLeftClick = () => {
        setCurrentIten(currentIten - 1);
        console.log(currentIten)
    }

    const handlerigthClick = () => {
        setCurrentIten(currentIten + 1);
        console.log(currentIten);
    }

    const handleSelectClick = (value) => {
        setCurrentIten(value);
        console.log(currentIten);
    }

    useEffect(() =>{
        const carrousselroll = setInterval(()=>{
            setCurrentIten(currentIten + 1);
        },MINUTE_MS);
        return () => clearTimeout(carrousselroll);
    },[currentIten, MINUTE_MS])

    return (
        <>
        <div>
            {error ? (<p> <img src={imgError} alt="error" style={{ width: "50px" }} />  {error}</p>) : (
                load ? (<img src={imgLoad} alt="Loading" style={{ width: "50px" }} />) : (
                    <>
        <div className="container" style={carrouselStyle}>
            <button className='arrow-left control' onClick={handleLeftClick}><img className='img-arrow-left' src={ preview } alt="next" /></button>
            <button className='arrow-right control' onClick={handlerigthClick}><img className='img-arrow-right' src={ next } alt="preview" /></button>
            <div className='gallery-wrapper'>
                <div className='gallery'>
                    {itens && itens.map((p) => (
                        <div
                            className={p.id === currentIten ? selected : unselected}
                            ref={p.id === currentIten ? selectedReference : null}
                            key={p.id} onClick={(e) => {handleSelectClick(p.id)}} >
                                <button className='like' style={{ backgroundImage: `url(${Unlike})`}}></button>
                                <div className="div-link">
                                <Link to={`/produtos/${p.id}`}>Detalhes</Link>
                                </div>
                            <Card name={p.name} price={p.price} about={p.about} categori={p.categori} thumb={p.pictures}/>
                            <hr />
                            <button className='btn-add-cart'>Add to Cart</button>
                            <button className='btn-buy'>Buy</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
                    </>
                )
            )}
        </div>
        </>
    )
}

export default Carrousel
