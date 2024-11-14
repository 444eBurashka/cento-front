import Button from "./Button";
import CheckBox from "./CheckBox";

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
                    <CheckBox elem={elem}></CheckBox>  
                )})
            }
            <Button buttonName="Попробовать" buttonClass="account-btn"></Button>
        </div>
    )
}