import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Search from "../components/Search";
import Variant from "../components/Variant";
import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";
import { Link } from 'react-router-dom';

const status = 'found';
const formatExamAnswers = {
    "OGE": 'ОГЭ',
    "EGE": "ЕГЭ"
}
const students = {
    "1": 'Иванов',
    "2": "Петров",
    "3": "Сидоров"
}

export default function TasksBasePage(props) {
    const [taskIds, setTaskIds] = useState('');
    const [variants, setVariants] = useState([]);
    const [variantId, setVariantId] = useState('');
    const [studentId, setStudentId] = useState('');
    const accessToken = useSelector(state => state.auth.accessToken);

    useEffect(() => {
        const fetchVariants = async () => {
            try {
                const response = await fetch('http://31.129.111.117:8000/api/combined-variants/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setVariants(data);
                } else {
                    console.error('Ошибка при получении вариантов');
                }
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        };

        fetchVariants();
    }, [accessToken]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://31.129.111.117:8000/api/create-variant/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ 
                fk_exam_id: 1,
                tasks: taskIds.split(' '),
                visibility: false,
                time_limit: "01:30:00"
             })
        });

        if (response.ok) {
            alert('Вариант успешно создан!');
            setTaskIds(''); // Очищаем поле ввода
        } else {
            alert('Ошибка при создании варианта');
        }
    };

    const handleHomeworkSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://31.129.111.117:8000/api/create-homework/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ 
                variant_id: variantId,
                student_email: studentId,
                dead_line: "2025-01-29T23:59:59"
             })
        });

        if (response.ok) {
            alert('Домашнее задание успешно создано!');
            setVariantId(''); // Очищаем поле ввода
            setStudentId(''); // Очищаем поле ввода
        } else {
            alert('Ошибка при создании домашнего задания');
        }
    };

    const addClassTasks = status === 'found' ? '' : 'hide';
    const addClassInfo = status === 'found' ? 'hide' : '';

    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="ДОБАВИТЬ ВАРИАНТ" />
                <form onSubmit={handleSubmit}>
                    <Input
                        textLabel="Введите id заданий"
                        placeholder="id через пробел"
                        value={taskIds}
                        onChange={(e) => setTaskIds(e.target.value)}
                    />
                    <Button buttonName="Добавить" buttonClass="editBtn" Type="submit" />
                </form>
                <PageTitle pageName="МОИ ВАРИАНТЫ" />
                <div className={"notfoundTitle " + addClassInfo}>
                    <p>К СОЖАЛЕНИЮ, ПО ВАШЕМУ <br></br> ЗАПРОСУ НИЧЕГО НЕ НАЙДЕНО</p>
                </div>
                <div className={"base-variants-list " + addClassTasks}>
                    {variants.map((variant, index) => (
                        <Link to={`/variant?id=${variant.id}`} key={variant.id}>
                            <Variant text={`Вариант id ${variant.id}`} />
                        </Link>
                    ))}
                </div>
                <form onSubmit={handleHomeworkSubmit}>
                    <Input
                        textLabel="Введите id варианта"
                        placeholder="id варианта"
                        value={variantId}
                        onChange={(e) => setVariantId(e.target.value)}
                    />
                    <Input
                        textLabel="Введите email ученика"
                        placeholder="email ученика"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <Button buttonName="Задать вариант" buttonClass="account-btn" Type="submit"/>
                </form>
            </div>
            <Footer />
            <div className="hide popup-overlay">
                <div className="popup">
                    <div className="title-wrapper">
                        <p>Выберите формат экзамена</p>
                        <button className="cross-btn"></button>
                    </div>
                    <Select text="Ученики" answers={students} />
                    <Select text="Режим экзамена" answers={formatExamAnswers} />
                    <Select text="Срок выполнения" answers={formatExamAnswers} />
                    <Button buttonClass="account-btn" buttonName="Задать вариант ученикам" />
                </div>
            </div>
        </div>
    );
}