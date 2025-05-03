import nextArrow from '../img/fin-next-arrow.svg';

export default function NextArrow (props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <img src={nextArrow}></img>
      </div>
    );
};