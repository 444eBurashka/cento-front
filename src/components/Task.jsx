import React, { useState } from 'react';
import Button from "./Button";
import Input from './Input';

export default function Task(props) {
    const [showAnswer, setShowAnswer] = useState(false); // Состояние для управления видимостью ответа
    const [inputValue, setInputValue] = useState(''); // Состояние для хранения значения поля Input
    const addClass = props.taskClass === 'notEditable' ? 'hide' : '';

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer); // Инвертируем значение состояния при каждом нажатии
    };

    // Обработчик изменения значения в поле Input
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value); // Обновляем локальное состояние
        if (props.onInputChange) {
            props.onInputChange(props.id, value); // Передаем значение в родительский компонент
        }
    };

    return (
        <div className="Task">
            <h4>Задание №{props.num} (id {props.id}) {props.exam}</h4>
            <p>{props.description}</p>
            {props.image ? <img src={props.image} alt="Картинка к заданию"></img> : ''}
            <div className={"task-interface-container " + addClass}>
                {props.test ? (
                    <>
                        <span>Ответ: </span>
                        <Input 
                            placeholder="Введите ответ" 
                            value={inputValue} // Привязываем значение к состоянию
                            onChange={handleInputChange} // Добавляем обработчик изменения
                        />
                    </>
                ) : (
                    <>
                        <Button 
                            buttonName={showAnswer ? 'Скрыть ответ' : 'Показать ответ'} 
                            buttonClass='account-btn' 
                            onClick={toggleAnswer} // Добавляем обработчик события
                        />
                        {showAnswer && <span>Ответ: {props.answer}</span>}
                    </>
                )}
            </div>
        </div>
    );
}