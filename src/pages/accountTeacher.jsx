import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Field from "../components/Field";
import SectionButton from "../components/SectionButton.jsx";
import avatar from '../img/defaultAvatar.png';
import Select from '../components/Select.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTokens, clearTokens } from '../store/store.js';
import Input from "../components/Input.jsx";
import ReactDOM from 'react-dom';

import { APIURL } from '../data.js';

const closeBtn = () => {
    const fullForm = document.getElementsByClassName('popup-overlay');
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

const openOverlay = () => {
    const fullForm = document.querySelector('.popup-overlay');
    console.log(fullForm);
    fullForm.classList.remove('hide');
    const closeBtn = document.querySelector('.cross-btn');
    closeBtn.addEventListener('click', () => {
        fullForm.classList.add('hide'); 
    });
}

const answersData = {
    "math": 'Математика',
    "info": "Информатика"
};

const formatExamAnswers = {
    "OGE": 'ОГЭ',
    "EGE": "ЕГЭ"
}

function handleClick(e) {
    e.preventDefault();
    closeBtn();
}
function handleClick1(e) {
    e.preventDefault();
    openOverlay();
}

export default function AccountTeacher(props) {
    const accessToken = useSelector(state => state.auth.accessToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [lessonDate, setLessonDate] = useState('');
    const [userData, setUserData] = useState({
        login: '',
        email: '',
        specialization: ''
    });
    const [upcomingLessons, setUpcomingLessons] = useState({});

    useEffect(() => {
        const fetchUpcomingLessons = async () => {
            try {
                const response = await fetch(APIURL + 'get-upcoming-lessons/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при получении данных о предстоящих уроках');
                }

                const data = await response.json();
                setUpcomingLessons(data);
                console.log(data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        if (userData.students) {
            fetchUpcomingLessons();
        }
    }, [accessToken, userData.students]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(APIURL + 'profile/', {
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
            const addStudentResponse = await fetch(APIURL + 'add-student/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: JSON.stringify({ "student_email": email }),
            });
    
            if (!addStudentResponse.ok) {
                throw new Error('Ошибка при добавлении ученика');
            }
    
            const addStudentData = await addStudentResponse.json();
            console.log('Ученик успешно добавлен:', addStudentData);
    

            const profileResponse = await fetch(APIURL + 'profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
            });
    
            if (!profileResponse.ok) {
                throw new Error('Ошибка при получении обновленных данных профиля');
            }
    
            const profileData = await profileResponse.json();
            console.log('Обновленные данные профиля:', profileData);

            setUserData({
                login: profileData.username,
                email: profileData.email,
                specialization: profileData.role,
                students: profileData.students,
            });
    
        } catch (error) {
            console.error('Ошибка:', error);
        }
        e.target.reset();
    };

    const handleScheduleLesson = async () => {
        try {
            const response = await fetch(APIURL + 'lessons/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: JSON.stringify({
                    student_email: studentEmail,
                    datetime: lessonDate
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении урока');
            }

            const data = await response.json();
            console.log('Урок успешно добавлен:', data);
            insertElementAtEnd("Урок успешно добавлен в расписание!", "correct");
        } catch (error) {
            console.error('Ошибка:', error);
            insertElementAtEnd("Произошла ошибка при добавлении урока.", "incorrect");
        }
    };

    return (
        <div className="App accountTeacher">
            <Header />
            <br></br>
            <div className="page-container">
                <div>
                    <div className="profile-container">
                        <PageTitle pageName="ПРОФИЛЬ"/>
                    </div>
                    <div className="info-container">
                        <div className='info-container-left'>
                            <img src={avatar} alt="Avatar" className='avatar'></img>
                            <div className="fields-container">
                                <Field fieldLabel="Логин" fieldText={userData.login}/>
                                <Field fieldLabel="Почта" fieldText={userData.email}/>
                                <Field fieldLabel="Специализация" fieldText={userData.specialization}/>
                            </div>
                        </div>
                        <div className='profile-container-interface'>
                            <Link to="/finance-report">   
                                <Button buttonName="Финансы" buttonClass="editBtn" />
                            </Link>
                            <Link to="/timetable-teacher">   
                                <Button buttonName="К расписанию" buttonClass="editBtn" />
                            </Link>
                            <Link to="/variantsBase">
                                <Button buttonName="Мои варианты" buttonClass="editBtn" />
                            </Link>
                            <Link to="/myTasks">
                                <Button buttonName="Мои задания" buttonClass="editBtn" />
                            </Link>
                            <Button buttonName="Выйти" buttonClass="editBtn" onClick={handleLogout} />
                        </div>
                    </div>
                    <PageTitle pageName="УЧЕНИКИ"/>
                    <div className="teachers-container">
                        {
                            userData.students && userData.students.map((student, index) =>
                                <SectionButton 
                                    key={index} 
                                    label={student.student_name} 
                                    datetime={upcomingLessons[student.student_name] || ""}
                                />
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
            <div className="popup-overlay hide">
                <div className="popup">
                    <div className="title-wrapper">
                        <p>Выберите когда будет урок и с кем</p>
                        <button className="cross-btn" onClick={handleClick}></button>
                    </div>
                    <Input 
                        textLabel="Email ученика" 
                        placeholder="Введите email ученика" 
                        value={studentEmail} 
                        onChange={(e) => setStudentEmail(e.target.value)}
                    />
                    <input 
                        type="datetime-local" 
                        id="date" 
                        name="date" 
                        value={lessonDate} 
                        onChange={(e) => setLessonDate(e.target.value)}
                    />
                    <Button 
                        buttonClass="account-btn" 
                        buttonName="Добавить в расписание" 
                        onClick={handleScheduleLesson}
                    />
                </div>
            </div>
        </div>
    );
}