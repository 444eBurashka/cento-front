import React, { useState } from 'react';
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
                                    <button>+</button>
                                </div>
                                <div className="task-constructor-image-wrapper">
                                    <img alt="Выберите изображение" src={defaultImage}></img>
                                </div>
                            </div>
                        </div>
                        <p>Правильный ответ</p>
                        <input value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}></input>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}