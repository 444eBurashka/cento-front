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

const closeBtn = () => {
    const fullForm = document.getElementsByClassName('popup-overlay');
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
            const addStudentResponse = await fetch('http://31.129.111.117:8000/api/add-student/', {
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
    

            const profileResponse = await fetch('http://31.129.111.117:8000/api/profile/', {
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
                            <Link to="/myTasks">
                                <Button buttonName="Назначить урок" buttonClass="editBtn" onClick={handleClick1}/>
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
            <div className="popup-overlay hide">
                <div className="popup">
                    <div className="title-wrapper">
                        <p>Выберите когда будет урок и с кем</p>
                        <button className="cross-btn" onClick={handleClick}></button>
                    </div>
                    <Select text="Выберите ученика" answers={formatExamAnswers}></Select>
                    <input type="date" id="date" name="date"></input>
                    <Button buttonClass="account-btn" buttonName="Сохранить формат"></Button>
                </div>
            </div>
        </div>
    );
}

