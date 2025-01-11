import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Field from "../components/Field";
import avatar from '../img/defaultAvatar.png';
import SectionButton from "../components/SectionButton";

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTokens, clearTokens } from '../store/store.js';

export default function AccountStudent(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken);
    const [userData, setUserData] = useState({
        login: '',
        email: '',
        grade: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://31.129.111.117:8000/api/profile/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при получении данных пользователя');
                }

                const data = await response.json();
                console.log(data.teachers);
                setUserData({
                    login: data.username,
                    email: data.email,
                    grade: data.student.studying_year,
                    subjects: data.subjects,
                    teachers: data.teachers
                });
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchUserData();
    }, [accessToken]);

    const handleLogout = () => {
        dispatch(clearTokens());
        console.log("Выход из системы");
        navigate('/');
    };

    return (
        <div className="App">
            <Header />
            <div className="page-container">
                <div className="page-container-fix">
                    <div className="profile-container">
                        <PageTitle pageName="ПРОФИЛЬ"/>
                        <Link to="/homework">
                            <Button buttonName="Мои домашние задания" buttonClass="editBtn" />
                        </Link>
                        <Button buttonName="Выйти" buttonClass="editBtn" onClick={handleLogout} />
                    </div>
                    <div className="info-container">
                        <img src={avatar} alt="Avatar" className='avatar'></img>
                        <div className="fields-container">
                            <Field fieldLabel="Логин" fieldText={userData.login}/>
                            <Field fieldLabel="Почта" fieldText={userData.email}/>
                            <Field fieldLabel="Класс" fieldText={userData.grade}/>
                        </div>
                        <div className="subjects-section">
                            <h3>Изучаемые предметы</h3>
                            <p>Профильная математика</p>
                            <p>Русский язык</p>
                            <p>Физика</p>
                        </div>
                    </div>
                    <PageTitle pageName="ПРЕПОДАВАТЕЛИ"/>
                    <div className="teachers-container">
                        {
                            userData.teachers && userData.teachers.map((teacher, index) =>
                                <SectionButton key={index} label={teacher.teacher_name}/>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}