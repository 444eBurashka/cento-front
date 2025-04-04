import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import { Link } from 'react-router-dom';
import TaskInfoWrapper from "../components/TaskInfoWrapper";
import Task from '../components/Task';
import { useSelector, useDispatch } from 'react-redux';

import { APIURL } from '../data';

const subjectdctbyID = {
    1: "Информатика",
    2: 'Математика'
}

export default function StudentTasksPage(props) {
    const accessToken = useSelector(state => state.auth.accessToken);
    const role = useSelector(state => state.auth.role);
    const [TASKS, setTASKS] = useState([]);
    const [TASKTYPE, setTASKTYPE] = useState({});
    

    useEffect(() => {

        // Загрузка задач
        fetch(APIURL + 'combined-tasks/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
        })
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

    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="МОИ ЗАДАНИЯ"/>
                <Link to="/taskConstructor">
                    <Button buttonName="Создать задание" buttonClass="editBtn" />
                </Link>
                <div className="tasks-list">
                    {TASKS.filter(task => !task.visibility).map(task => (
                        <Task
                            key={task.id}
                            num={TASKTYPE[task.fk_code_of_type]}
                            id={task.id}
                            description={task.description}
                            answer={task.correct_answer}
                            exam={subjectdctbyID[task.fk_exam_id]}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}