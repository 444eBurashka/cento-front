import prevArrow from "../img/prev-arrow.png";
import nextArrow from "../img/next-arrow.png";

export default function DataChanger(props) {
    return (
        <div className="DataChanger">
            <button onClick={props.onPrevClick} className="week-nav-button">
                <img src={prevArrow} alt="Предыдущая неделя" />
            </button>
            <span>{props.text}</span>
            <button onClick={props.onNextClick} className="week-nav-button">
                <img src={nextArrow} alt="Следующая неделя" />
            </button>
        </div>
    );
}