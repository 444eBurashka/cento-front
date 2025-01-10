import React, { useState } from 'react';
import Button from "./Button";

export default function Task(props) {
    const [showAnswer, setShowAnswer] = useState(false); // Состояние для управления видимостью ответа
    const addClass = props.taskClass === 'notEditable' ? 'hide' : '';

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer); // Инвертируем значение состояния при каждом нажатии
    };

    return (
        <div className="Task">
            <h4>Задание №{props.num} (id {props.id})</h4>
            <p>{props.description}</p>
            {props.image ? <img src={props.image} alt="Картинка к заданию"></img> : ''}
            <div className={"task-interface-container " + addClass}>
                {/* <Button buttonName='Редактировать' buttonClass='editBtn'></Button> */}
                <Button 
                    buttonName={showAnswer ? 'Скрыть ответ' : 'Показать ответ'} 
                    buttonClass='account-btn' 
                    onClick={toggleAnswer} // Добавляем обработчик события
                />
                {showAnswer && <span>Ответ: {props.answer}</span>} {/* Условный рендеринг */}
            </div>
        </div>
    );
}