import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Select from "../components/Select";
import defaultImage from "../img/defaultImg.png";
import { useSelector } from 'react-redux'; // Импортируем useSelector
import { Navigate, useNavigate } from 'react-router-dom';

const formatExamAnswers = {
    "OGE": 'ОГЭ',
    "EGE": "ЕГЭ"
};
const examsAnswers = {
    "2": 'Математика',
    "1": "Информатика"
};

const formatAnswers = {
    "variants": 'Ответ с вариантами',
    "text": "Развернутый ответ",
    "table": "Табличный ответ"
};

const getCount = count => {
    let content = [];
    for (let i = 0; i < count; i++) {
        content.push(<textarea key={i}></textarea>);
    }
    return content;
};

const Popup = (props) => {
    return (
        <div className={'alert-popup ' + props.popupClass}>{props.text}</div>
    );
};
  
const insertElementAtEnd = (text, type) => {
    const newElement = document.createElement('div');
    document.body.appendChild(newElement);
    ReactDOM.render(<Popup popupClass={type} text={text}/>, newElement);
    newElement.addEventListener('animationend', () => {
        newElement.remove();
      });
};

export default function TaskConstructor(props) {
    const [taskNumber, setTaskNumber] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const navigate = useNavigate(); // Хук для переадресации

    // Получаем accessToken и role из состояния Redux
    const accessToken = useSelector(state => state.auth.accessToken);
    const role = useSelector(state => state.auth.role);

    const handleSubjectChange = (value) => {
        setSelectedSubject(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const taskData = {
            "fk_code_of_type": taskNumber,          
            "fk_exam_id": selectedSubject,               
            "visibility": false,            
            "description": taskDescription, 
            "image_path": "",
            "correct_answer": correctAnswer,     
            "file_path": ""
        };
        
        console.log(taskData);
        if (taskData.fk_code_of_type === '1' || taskData.fk_code_of_type === '2' || taskData.fk_code_of_type === '3' || taskData.fk_code_of_type === '4' || taskData.fk_code_of_type === '5') {
            if (taskData.fk_exam_id && taskData.description && taskData.correct_answer) {
                try {
                    const response = await fetch('http://31.129.111.117:8000/api/create-task/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}` // Используем accessToken из состояния Redux
                        },
                        body: JSON.stringify(taskData)
                    });
                
                    if (!response.ok) {
                        throw new Error('Ошибка при отправке данных');
                    }
                
                    const result = await response.json();
                    console.log('Успешно отправлено:', result);
                    navigate("/myTasks");
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            }
            else {
                if (!taskData.fk_exam_id) {
                    // alert("Нужно выбрать предмет");
                    insertElementAtEnd("Нужно выбрать предмет", "incorrect");
                }
                else if (!taskData.description) {
                    // alert("Описание не может быть пустым");
                    insertElementAtEnd("Описание не может быть пустым", "incorrect");
                }
                else if (!taskData.correct_answer) {
                    // alert("Правильный ответ не может быть пустым");
                    insertElementAtEnd("Правильный ответ не может быть пустым", "incorrect");
                }
            }            
        }
        else {
            // alert("В нынешней версии сервиса доступны к добалению ТОЛЬКО первые 5 типов заданий по предметам информатика и математика");
            insertElementAtEnd("В нынешней версии сервиса доступны к добалению ТОЛЬКО первые 5 типов заданий по предметам информатика и математика", "medium");
        }
            
    };

    const uu = () => {
        // alert("Функционал добавления картинок будет доступен в следующих версиях");
        insertElementAtEnd("Функционал добавления картинок будет доступен в следующих версиях", "medium");
    };

    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="КОНСТРУКТОР ЗАДАНИЙ" />
                <form onSubmit={handleSubmit}>
                    <div className="task-constructor">
                        <div className="task-constructor-header">
                            <span>Задание №<input value={taskNumber} onChange={(e) => setTaskNumber(e.target.value)}></input></span>
                            <Button buttonName="Сохранить задание" buttonClass="account-btn" Type="submit"></Button>
                        </div>
                        <div className="task-constructor-search">
                            <Select selectClass="simple-select" text="Выберете предмет" answers={examsAnswers} onChange={handleSubjectChange}></Select>
                        </div>
                        <div className="task-constructor-main">
                            <div className="task-constructor-description">
                                <textarea placeholder="Введите текст задачи" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                            </div>
                            <div className="task-constructor-image">
                                <div className="task-constructor-image-title">
                                    <span>Изображение</span>
                                    <button onClick={uu}>+</button>
                                </div>
                                <div className="task-constructor-image-wrapper">
                                    <img alt="Выберите изображение" src={defaultImage}></img>
                                </div>
                            </div>
                        </div>
                        <p>Правильный ответ
                        <input value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}></input></p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}