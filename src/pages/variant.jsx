import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Task from "../components/Task";
import { taskpics } from '../data';
import { useSelector } from 'react-redux';
import Button from '../components/Button';

import { APIURL } from '../data';

const subjectdctbyID = {
    1: "Информатика",
    2: 'Математика'
}

export default function VariantPage(props) {
    const role = useSelector(state => state.auth.role);
    const accessToken = useSelector(state => state.auth.accessToken);
    const [TASKTYPE, setTASKTYPE] = useState({});
    const [filteredTasks, setFilteredTasks] = useState({ tasks: [] });
    const [variantId, setvariantID] = useState('');
    const [taskInputs, setTaskInputs] = useState({});
    const [responseResult, setResponseResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(document.location);
        const params = url.searchParams;
        setvariantID(params.get("id"))

        const fetchTasks = async () => {
            try {
                const response = await fetch(APIURL + `variants/${params.get("id")}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFilteredTasks(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchTasks();

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
    }, [variantId]);

    // Инициализация taskInputs с пустыми ответами
    useEffect(() => {
        if (filteredTasks.tasks && filteredTasks.tasks.length > 0) {
            const initialTaskInputs = {};
            filteredTasks.tasks.forEach(task => {
                initialTaskInputs[task.id] = '';
            });
            setTaskInputs(initialTaskInputs);
        }
    }, [filteredTasks]);

    // Обработчик изменения значения в поле Input
    const handleInputChange = (taskId, value) => {
        setTaskInputs(prevState => ({
            ...prevState,
            [taskId]: value
        }));
    };

    // Обработчик нажатия на кнопку "Отправить"
    const handleSubmit = async () => {
        try {
            var dct = {
                variant_id: variantId,
                answers: taskInputs
            }
            console.log(dct)
            const response = await fetch(APIURL + 'check-variant/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    variant_id: variantId,
                    answers: taskInputs
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setResponseResult(result);
            navigate('/homework');
            // console.log(responseResult);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName={"ВАРИАНТ " + variantId} />
                <div className="base-tasks-list">
                    {filteredTasks.tasks && filteredTasks.tasks.map(task => (
                        <Task
                            key={task.id}
                            num={TASKTYPE[task.fk_code_of_type]}
                            id={task.id}
                            description={task.description}
                            image={taskpics[task.image_path]}
                            answer={task.correct_answer}
                            exam={subjectdctbyID[task.fk_exam_id]}
                            test={role === "/accountStudent" ? true : false}
                            onInputChange={handleInputChange} // Передаем обработчик в Task
                        />
                    ))}
                    <Button buttonClass="account-btn" buttonName="Отправить" onClick={handleSubmit} />
                </div>
            </div>
            <Footer />
        </div>
    );
}