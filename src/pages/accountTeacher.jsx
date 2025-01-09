import React, { useState } from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Field from "../components/Field";
import SectionButton from "../components/SectionButton.jsx";
import avatar from '../img/defaultAvatar.png';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTokens, clearTokens } from '../store/store.js';
import Input from "../components/Input.jsx";


export default function AccountTeacher(props) {
    const accessToken = useSelector(state => state.auth.accessToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleLogout = () => {
        dispatch(clearTokens());
        console.log("Выход из системы");
        navigate('/');
    };

    const handleAddStudent = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        console.log(email);
        try {
            const response = await fetch('http://31.129.111.117:8000/api/add-student/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: JSON.stringify({ "student_email": email, }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении ученика');
            }

            const data = await response.json();
            console.log('Ученик успешно добавлен:', data);
            // Можно добавить уведомление об успешном добавлении ученика
        } catch (error) {
            console.error('Ошибка:', error);
            // Можно добавить уведомление об ошибке
        }
    };

    return (
        <div className="App">
            <Header />
            <br></br>
            <div className="page-container">
                <div>
                    <div className="profile-container">
                        <PageTitle pageName="ПРОФИЛЬ"/>
                        {/* <Button buttonName="Редактировать" buttonClass="editBtn"/> */}
                        <Button buttonName="Выйти" buttonClass="editBtn" onClick={handleLogout} />
                    </div>
                    <div className="info-container">
                        <img src={avatar} alt="Avatar" className='avatar'></img>
                        <div className="fields-container">
                            <Field fieldLabel="Логин" fieldText="Иванов Иван Иванович"/>
                            <Field fieldLabel="Почта" fieldText="i.i.ivanov@mail.ru"/>
                            <Field fieldLabel="Специализация" fieldText="Подготовка к ОГЭ и ЕГЭ по физике"/>
                        </div>
                        {/* <p className="mainQuote">Ключевое в подготовке - <br></br>правильный подход к решению задачи! </p> */}
                    </div>
                    <PageTitle pageName="УЧЕНИКИ"/>
                    <div className="teachers-container">
                        <SectionButton />
                        <SectionButton />
                        <SectionButton />
                        <SectionButton />
                    </div>
                    <br></br>
                    <PageTitle pageName="ДОБАВИТЬ УЧЕНИКА"/>
                    <form className="add-student-wrapper" onSubmit={handleAddStudent}>
                        <Input textLabel="Email ученика" placeholder="Введите email ученика" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Button buttonName="Добавить" buttonClass="editBtn" Type="submit" />
                    </form>
                    {/* <PageTitle pageName="ОБРАЗОВАНИЕ"/>
                    <p>Закончил ведущий лицей №108 в г. Москва. В 2014 году поступил в Институт новых материалов и технологий УрФУ на программу “Металлургия и инновационные решение”. 
                        Продолжил свое обучение в магистратуре ядерной физики. Опыт подготовки к экзаменам ОГЭ и ЕГЭ по физике 3 года.</p> */}
                </div>
            </div>
            <Footer />
        </div>
      );
}