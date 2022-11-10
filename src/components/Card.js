
import notFound from '../assets/notfound.jpg'
import style from './Card.module.css'
import { useEffect, useState } from 'react';

const Card = ({ name, price, about, categori, thumb }) => {

    const [textInstallments, setTextInstallments] = useState("");
    const [installments, setinstallments ] = useState(0);
    const [value, setValue] = useState(0);


    useEffect(() => {
       const calcInstallments = () =>{
        if (price >= 100) {
            setValue((price / 2).toFixed(2))
            setinstallments(2)
        }
         if (price >= 150) {
            setValue((price / 3).toFixed(2))
            setinstallments(3)
        } 
         if (price >= 500) {
            setValue((price / 4).toFixed(2))
            setinstallments(4)
        }
        if (price >= 1000) {
            setValue((price / 6).toFixed(2))
            setinstallments(6)
        } 
         if (price >= 2000) {
            setValue((price / 10).toFixed(2))
            setinstallments(10)
        }
        if (price > 5000) {
            setValue((price / 24).toFixed(2))
            setinstallments(24)
        }
        if(price < 100){
            setValue(0)
            setinstallments(0)
        }

        if (value !== 0) {
            setTextInstallments(
                `Dividido em até ${installments}X sem júros de R$ ${value}.`
            )
        }
       }
       calcInstallments();
    },[price, installments, value])

    return (
        <>
            <div className={style.card}>
                <div className={style.card_content_img}>
                {!thumb && 
                <img src={notFound} alt="picture_product" className={style.card_img} />
                }
                {thumb &&
                    <img src={thumb[0].img} alt={name} className={style.card_img} />
                }
                </div>
                <br />
                <h3 className={style.card_title}>{name}</h3><br />
                <hr />
                <strong><p className="price"> R$ { (price).toFixed(2) }</p></strong><br />
                {value !== 0 && 
                <p>
                    {textInstallments}
                </p>
                }
            </div>
        </>
    )
}

export default Card