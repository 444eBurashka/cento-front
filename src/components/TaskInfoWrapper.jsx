import { Link } from 'react-router-dom';
import Button from './Button';

export default function TaskInfoWrapper(props) {
    return (
        <div className='taskInfo-wrapper'>
            <div className='info-wrapper'>
                <span>Вариант: {props.taskName}</span>
                <span>Дедлайн: {props.taskDeadline}</span>
                <span>{'Статус: '+ props.taskStatus}</span>
                <span>Баллы: {props.points}</span>
            </div>
            <Link to={`/variant?id=${props.variantID}`}>
                <Button buttonName={props.taskStatus==="задано"? 'Выполнить' : props.taskStatus ==="на проверке" ? 'Посмотреть решение' : 'Посмотреть'} buttonClass={props.taskStatus==='задано'? 'account-btn' : 'editBtn'}/>
            </Link>
        </div>
    )
}