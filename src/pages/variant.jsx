import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Task from "../components/Task";
import { taskpics } from '../data';

const subjectdctbyID = {
    1: "Информатика",
    2: 'Математика'
}

export default function VariantPage(props) {
    const [TASKTYPE, setTASKTYPE] = useState({});
    const [filteredTasks, setFilteredTasks] = useState({ tasks: [] }); // Инициализация с пустым массивом задач
    const [variantId, setvariantID] = useState(''); // Получаем ID варианта из URL

    useEffect(() => {
        const url = new URL(document.location);
        const params = url.searchParams;
        setvariantID(params.get("id"))

        // Функция для получения заданий варианта
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://31.129.111.117:8000/api/variants/${params.get("id")}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFilteredTasks(data); // Предполагаем, что данные приходят в формате { tasks: [...] }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchTasks();

        // Загрузка типов задач
        fetch('http://31.129.111.117:8000/api/task_type/')
            .then(response => response.json())
            .then(data => {
                const taskTypeDict = {};
                data.forEach(taskType => {
                    taskTypeDict[taskType.id] = taskType.number_of_task;
                });
                setTASKTYPE(taskTypeDict);
            })
            .catch(error => console.error('Ошибка при получении типов задач:', error));
    }, [variantId]); // Зависимость от variantId, чтобы запрос выполнялся при изменении ID варианта

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
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}