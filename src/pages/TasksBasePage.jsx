import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Select from "../components/Select";
import Task from "../components/Task";
import Button from "../components/Button";
import { taskpics } from '../data';

import { APIURL } from '../data';

const answersData = {
    "math": 'Математика',
    "info": "Информатика"
};

const subjectdct = {
    'math': 2,
    'info': 1
}

const subjectdctbyID = {
    1: "Информатика",
    2: 'Математика'
}

const tasktypes = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5
};

const status = 'found';
const formatExamAnswers = {
    "OGE": 'ОГЭ',
    "EGE": "ЕГЭ"
}

export default function TasksBasePage(props) {
    const [TASKS, setTASKS] = useState([]);
    const [TASKTYPE, setTASKTYPE] = useState({});
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTaskType, setSelectedTaskType] = useState('');
    

    useEffect(() => {
        // Загрузка задач
        fetch(APIURL + 'task/')
            .then(response => response.json())
            .then(data => setTASKS(data))
            .catch(error => console.error('Ошибка при получении данных:', error));

        // Загрузка типов задач
        fetch(APIURL + 'task_type/')
            .then(response => response.json())
            .then(data => {
                const taskTypeDict = {};
                data.forEach(taskType => {
                    taskTypeDict[taskType.id] = taskType.number_of_task;
                });
                setTASKTYPE(taskTypeDict);
            })
            .catch(error => console.error('Ошибка при получении типов задач:', error));
    }, []);

    const handleSubjectChange = (value) => {
        setSelectedSubject(value);
    };

    const handleTaskTypeChange = (value) => {
        setSelectedTaskType(value);
    };

    const filteredTasks = TASKS.filter(task => {
        const subjectMatch = selectedSubject ? task.fk_exam_id === subjectdct[selectedSubject] : false;
        const taskTypeMatch = selectedTaskType ? TASKTYPE[task.fk_code_of_type] == selectedTaskType : true;
        const visibilityMatch = task.visibility === true;
        return subjectMatch && taskTypeMatch && visibilityMatch;
    });
    console.log("Filtered Tasks:", filteredTasks);

    const addClassTasks = status === 'found' ? '' : 'hide';
    const addClassInfo = status === 'found' ? 'hide' : '';

    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="БАНК ЗАДАНИЙ" />
                <div className="search-container">
                    <Select text='Предмет' answers={answersData} onChange={handleSubjectChange}></Select>
                    <Select text='Тип задания' answers={tasktypes} onChange={handleTaskTypeChange}></Select>
                </div>
                <div className={"notfoundTitle " + addClassInfo}>
                    <p>К СОЖАЛЕНИЮ, ПО ВАШЕМУ <br></br> ЗАПРОСУ НИЧЕГО НЕ НАЙДЕНО</p>
                </div>
                <div className={"base-tasks-list " + addClassTasks}>
                    {filteredTasks.map(task => (
                        <Task
                            key={task.id}
                            num={TASKTYPE[task.fk_code_of_type]}
                            id={task.id}
                            description={task.description}
                            image={taskpics[task.image_path]}
                            answer={task.correct_answer}
                            exam={subjectdctbyID[task.fk_exam_id]}
                        />
                    ))}
                </div>
            </div>
            <Footer />
            <div className="hide popup-overlay">
                <div className="popup">
                    <div className="title-wrapper">
                        <p>Выберите формат экзамена и предмет</p>
                        <button className="cross-btn"></button>
                    </div>
                    <Select text="Формат экзамена" answers={formatExamAnswers}></Select>
                    <Select text="Преподаваемая дисциплина" answers={answersData}></Select>
                    <Button buttonClass="account-btn" buttonName="Сохранить формат"></Button>
                </div>
            </div>
        </div>
    );
}