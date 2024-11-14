import Button from "./Button";
import funcImg from "../img/check.png";

const data = ['Фишка 1', 'Фишка 2, где много текста и необходим перенос', 'Фишка 3']

export default function Rate(props) {
    return (
        <div className="rate">
            <p className="rate-name">{props.name}</p>
            <p className="rate-description">{props.description}</p>
            <div className="price-wrapper">
                <span className="price">{props.price}</span>
                <span className="price-period">/месяц</span>
            </div>
            {
                data.map((elem) => { return (
                    <div class="func-wrapper">
                        <img className="check-img" src={funcImg} alt="Знак галочки"></img>
                        <label>{elem}</label>
                    </div>   
                )})
            }
            <Button buttonName="Попробовать" buttonClass="account-btn"></Button>
        </div>
    )
}