import selectedPeopleIcon from '../img/selectedPeople.png';

export default function SelectedPeople(props) {
    return (
        <div className='SelectedPeople'>
            <p>{props.text}</p>
            <button>
                <img src={selectedPeopleIcon}></img>
            </button>
        </div>
    );
}
