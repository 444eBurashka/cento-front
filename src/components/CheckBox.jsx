import funcImg from "../img/check.png";

export default function CheckBox(props) {
    return (
        <div className="func-wrapper">
            <img className="check-img" src={funcImg} alt="Знак галочки"></img>
            <label>{props.elem}</label>
        </div>  
    )
}