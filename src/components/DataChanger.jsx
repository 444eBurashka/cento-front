import prevArrow from "../img/prev-arrow.png";
import nextArrow from "../img/next-arrow.png";

export default function DataChanger(props) {
    return (
        <div className="DataChanger">
            <img src={prevArrow}></img>
            <span>{props.text}</span>
            <img src={nextArrow}></img>
        </div>
    );
}