import Button from './Button';

export default function TaskInfoWrapper(props) {
    return (
        <div className='taskInfo-wrapper'>
            <div className='info-wrapper'>
                <span>{props.taskName}</span>
                <span>{props.taskSubject}</span>
                <span>{'Статус: '+ props.taskStatus}</span>
            </div>
            <Button buttonName={props.taskStatus==="задано"? 'Выполнить' : props.taskStatus ==="на проверке" ? 'Посмотреть решение' : 'Посмотреть'} buttonClass={props.taskStatus==='задано'? 'account-btn' : 'editBtn'}/>
        </div>
    )
}