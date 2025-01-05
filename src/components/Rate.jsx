import Button from "./Button";
import CheckBox from "./CheckBox";

export default function Rate(props) {
    return (
        <div className="rate">
            <p className="rate-name">{props.name}</p>
            <p className="rate-description">{props.description}</p>
            <div className="price-wrapper">
                <span className="price">{props.price}₽</span>
                <span className="price-period">/месяц</span>
            </div>
            {
                props.advantages.map((elem, index) => { 
                    return (
                        <CheckBox key={index} elem={elem}></CheckBox>  
                    )
                })
            }
            <Button buttonName="Попробовать" buttonClass="account-btn"></Button>
        </div>
    )
}