import prevArrow from '../img/fin-prev-arrow.svg';

export default function PrevArrow (props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <img src={prevArrow}></img>
      </div>
    );
};