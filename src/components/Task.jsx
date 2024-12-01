import Button from "./Button";


export default function Task(props) {
    const addClass = props.taskClass==='notEditable' ? 'hide' : '';
    return(
        <div className="Task">
            <h4>Задание № {props.id}</h4>
            <p>{props.description}</p>
            {props.image ? <img src={props.image} alt="Картинка к заданию"></img> : ''}
            <div className={"task-interface-container " + addClass}>
                <Button buttonName='Редактировать' buttonClass='editBtn'></Button>
                <Button buttonName='Показать ответ' buttonClass='account-btn'></Button>
                <span>Ответ: {props.answer}</span>
            </div>
        </div> 
    )
}