import Button from './Button';

export default function Student(props) {
    return (
        <div className='student-wrapper'>
            <div className='info-wrapper'>
                <span>{props.studentName + ', ' + props.studentClass}</span>
                <span>{props.studentSubject}</span>
            </div>
            <div className='buttons-wrapper'>
                <Button buttonName="Проверить задания" buttonClass='editBtn'/>
                <Button buttonName="Задать задание" buttonClass='account-btn'/>
            </div>
        </div>
    )
}