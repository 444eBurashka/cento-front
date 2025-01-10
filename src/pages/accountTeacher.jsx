import React, { useState, useEffect } from 'react';
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
    const [userData, setUserData] = useState({
        login: '',
        email: '',
        specialization: ''
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
                console.log(data);
                setUserData({
                    login: data.username,
                    email: data.email,
                    specialization: data.role,
                    students: data.students
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

    const handleAddStudent = async (e) => {
        e.preventDefault();
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
        } catch (error) {
            console.error('Ошибка:', error);
        }
        e.target.reset();
    };

    return (
        <div className="App">
            <Header />
            <br></br>
            <div className="page-container">
                <div>
                    <div className="profile-container">
                        <PageTitle pageName="ПРОФИЛЬ"/>
                        <Button buttonName="Выйти" buttonClass="editBtn" onClick={handleLogout} />
                    </div>
                    <div className="info-container">
                        <img src={avatar} alt="Avatar" className='avatar'></img>
                        <div className="fields-container">
                            <Field fieldLabel="Логин" fieldText={userData.login}/>
                            <Field fieldLabel="Почта" fieldText={userData.email}/>
                            <Field fieldLabel="Специализация" fieldText={userData.specialization}/>
                        </div>
                    </div>
                    <PageTitle pageName="УЧЕНИКИ"/>
                    <div className="teachers-container">
                        {
                            userData.students && userData.students.map((student, index) =>
                                <SectionButton key={index} label={student.student_name}/>
                            )
                        }
                    </div>
                    <br></br>
                    <PageTitle pageName="ДОБАВИТЬ УЧЕНИКА"/>
                    <form className="add-student-wrapper" onSubmit={handleAddStudent}>
                        <Input textLabel="Email ученика" placeholder="Введите email ученика" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Button buttonName="Добавить" buttonClass="editBtn" Type="submit" />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}