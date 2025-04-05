import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import DataChanger from '../components/DataChanger';
import Calendar from '../components/Calendar';
import LessonPlanT from '../components/LessonPlanT';
import Button from '../components/Button';
import TimeBtn from '../img/time.png';
import SendBtn from '../img/send.png';
import PeopleBtn from '../img/people.png';
import RepeatBtn from '../img/repeat.png';
import CloseBtn from '../img/cross-btn-lesson.png';
import EditBtn from '../img/edit-lesson-btn.png';
import Select from '../components/Select';
import SubjectBtn from '../img/subject-lesson.png';
import ColorBtn from '../img/color-lesson.png';
import ErrorBtn from '../img/error-btn.png';

import { APIURL } from '../data';

export default function TimetableteacherPage() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [weekOffset, setWeekOffset] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    // Функция для получения дат недели с учетом смещения
    const getWeekDates = (offset = 0) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        
        const monday = new Date(today);
        monday.setDate(today.getDate() - diffToMonday + (offset * 7));
        
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            weekDates.push(date);
        }
        return weekDates;
    };

    // Получаем даты текущей недели с учетом смещения
    const currentWeekDates = getWeekDates(weekOffset);
    
    // Форматируем даты для API запроса (YYYY-MM-DD)
    const formatDateForAPI = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Получаем занятия с сервера
    const fetchLessons = async () => {
        try {
            setLoading(true);
            const startDate = formatDateForAPI(currentWeekDates[0]);
            const endDate = formatDateForAPI(currentWeekDates[6]);
            
            const response = await fetch(APIURL + 'teacher-period-schedule/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: JSON.stringify({
                    start_date: startDate,
                    end_date: endDate
                })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            setLessons(data);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        } finally {
            setLoading(false);
        }
    };

    // Форматируем даты для отображения
    const formatDateRange = () => {
        const firstDate = currentWeekDates[0];
        const lastDate = currentWeekDates[6];
        
        const firstDay = firstDate.getDate();
        const lastDay = lastDate.getDate();
        
        if (firstDate.getMonth() === lastDate.getMonth()) {
            const month = firstDate.toLocaleString('ru', { month: 'long' }).toUpperCase();
            return `${firstDay}-${lastDay} ${month}`;
        } else {
            const firstMonth = firstDate.toLocaleString('ru', { month: 'long' }).toUpperCase();
            const lastMonth = lastDate.toLocaleString('ru', { month: 'long' }).toUpperCase();
            return `${firstDay} ${firstMonth} - ${lastDay} ${lastMonth}`;
        }
    };

    // Обработчики для кнопок переключения недель
    const handlePrevWeek = () => {
        setWeekOffset(prev => prev - 1);
    };

    const handleNextWeek = () => {
        setWeekOffset(prev => prev + 1);
    };

    // Группируем занятия по дням недели
    const groupLessonsByDay = () => {
        const grouped = [[], [], [], [], [], [], []]; // 7 дней недели
        
        lessons.forEach(lesson => {
            const lessonDate = new Date(lesson.datetime);
            const dayOfWeek = lessonDate.getDay(); // 0 - воскресенье, 6 - суббота
            
            // Преобразуем воскресенье (0) в 6 для совместимости с нашей структурой
            const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            
            if (dayIndex >= 0 && dayIndex < 7) {
                grouped[dayIndex].push(lesson);
            }
        });
        
        return grouped;
    };

    // Преобразуем статус с сервера в наш формат
    const getStatusText = (status) => {
        switch (status) {
            case 'not_held': return 'запланировано';
            case 'completed': return 'проведено';
            case 'cancelled': return 'отменено';
            case 'in_progress': return 'идет';
            default: return 'запланировано';
        }
    };

    // Форматируем время (из "2025-04-05T20:00:00Z" в "20:00")
    const formatTime = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    // Загружаем данные при изменении недели
    useEffect(() => {
        fetchLessons();
    }, [weekOffset]);

    const lessonsByDay = groupLessonsByDay();

    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="МОЕ РАСПИСАНИЕ" />
                <div>
                    <div className='timetable-info'>
                        <DataChanger 
                            text={formatDateRange()}
                            onPrevClick={handlePrevWeek}
                            onNextClick={handleNextWeek}
                        /> 
                        <Button buttonName="+ добавить занятие" buttonClass="account-btn"></Button>
                    </div>
                    <Calendar dates={currentWeekDates}></Calendar>
                    {loading ? (
                        <h2>Загрузка расписания...</h2>
                    ) : (
                        <div className='lessons-planners'>
                            {lessonsByDay.map((dayLessons, dayIndex) => (
                                <div className="lessons-planners-item" key={dayIndex} day-id={dayIndex}>
                                    {dayLessons.map((lesson, index) => (
                                        <LessonPlanT
                                            key={lesson.id}
                                            time={formatTime(lesson.datetime)}
                                            status={getStatusText(lesson.status)}
                                            subject={lesson.exam_info.name}
                                            lessonName={lesson.lesson_name}
                                            lessonStudent={lesson.student_info.name}
                                            lessonLinkName="подробнее"
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <div className='hide lesson-description'>
                <div className='lesson-desc-interface'>
                    <div className='lesson-desc-subject'>Информатика</div>
                    <div>
                        <button className='lesson-desc-edit-btn'><img src={EditBtn}></img></button>
                        <button className='lesson-desc-close-btn'><img src={CloseBtn}></img></button>
                    </div>
                </div>
                <div className='lesson-desc-name'>Основы программирования на Python</div>
                <div className='lesson-desc-item'>
                    <div className='time-info'>
                        <img src={TimeBtn}></img>
                        <div className='lesson-desc-info-text'>Понедельник, 19 марта</div>
                        <div className='lesson-desc-info-time'>12:00 - 13:30</div>
                    </div>
                    <div className='people-info'>
                        <img src={PeopleBtn}></img>
                        <div className='lesson-desc-info-text'>Иванов Иван Иванович</div>
                    </div>
                    <div className='repeat-info'>
                        <img src={RepeatBtn}></img>
                        <div className='lesson-desc-info-text'>Каждую неделю</div>
                    </div>
                </div>
                <div className='lesson-desc-hw'>
                    <div className='lesson-desc-title'>Домашнее задание</div>
                    <div className='lesson-desc-text'>Нужно будет прорешать вариант №5 и сделать анализ целевой аудитории</div>
                    <Button buttonName="Перейти к заданию" buttonClass="editBtn"></Button>
                </div>
                <div>
                    <div className='lesson-desc-title'>Комментарий к занятию</div>
                    <div className='lesson-desc-text'>Дополнительные материалы и справочники находятся тут: https://i.pinimg.com/736x/14/bd/12/14bd120697c78a5c01af159e6bc231e0.jpg</div>
                    <div className='lesson-desc-input-comment'>
                        <input placeholder="Оставить комментарий"></input>
                        <button><img src={SendBtn}></img></button>
                    </div>
                </div>
            </div>

            <div className='hide lesson-add'>
                <div className='lesson-add-interface'>
                    <div className='lesson-add-subject'>Информатика</div>
                    <div>
                        <Button buttonName='Сохранить' buttonClass='editBtn saveBtn'></Button>
                        <button className='lesson-add-close-btn'><img src={CloseBtn}></img></button>
                    </div>
                </div>
                <div className='lesson-add-name'>Основы программирования на Python</div>
                <div className='lesson-add-item'>
                    <div className='time-info'>
                        <img src={TimeBtn}></img>
                        <Select text="назначить дату и время" answers='' selectClass='lesson-add-info-text'></Select>
                        <div className='lesson-add-error'>
                            <img src={ErrorBtn}></img>
                            <div>Конфликт с занятием «Консультация» по информатике</div>
                        </div>
                    </div>
                    <div className='people-info'>
                        <img src={PeopleBtn}></img>
                        <Select text="добавить учеников" answers='' selectClass='lesson-add-info-text'></Select>
                    </div>
                    <div className='repeat-info'>
                        <img src={RepeatBtn}></img>
                        <Select text="не повторять" answers='' selectClass='lesson-add-info-text'></Select>
                    </div>
                    <div className='subject-info'>
                        <img src={SubjectBtn}></img>
                        <Select text="выберите предмет" answers='' selectClass='lesson-add-info-text'></Select>
                    </div>
                    <div className='color-info'>
                        <img src={ColorBtn}></img>
                        <Select text="выберите цвет" answers='' selectClass='lesson-add-info-text'></Select>
                    </div>
                </div>
                <div className='lesson-add-hw'>
                    <div className='lesson-add-title'>Домашнее задание</div>
                    <div className='lesson-add-text'>Нужно будет прорешать вариант №5 и сделать анализ целевой аудитории</div>
                    <Button buttonName="Перейти к заданию" buttonClass="editBtn"></Button>
                </div>
                <div className='lesson-add-footer'>
                    <div className='lesson-add-title'>Комментарий к занятию</div>
                    <div className='lesson-add-text'>Дополнительные материалы и справочники находятся тут: https://i.pinimg.com/736x/14/bd/12/14bd120697c78a5c01af159e6bc231e0.jpg</div>
                    <Button buttonName='отменить занятие' buttonClass='errorBtn'></Button>
                </div>
            </div>

            <div className="hide popup-overlay">
                <div className="popup change-time">
                    <div className="title-wrapper">
                        <p>Выберите время переноса занятия</p>
                        <button className="cross-btn"></button>
                    </div>
                    <Select text="Время занятия" answers='' />
                    <Button buttonClass="account-btn check-btn" buttonName="Подтвердить" />
                </div>
            </div>

            <div className="hide popup-overlay">
                <div className="popup canceled-lesson">
                    <div className="title-wrapper">
                        <p>Выберите причину отмены занятия</p>
                        <button className="cross-btn"></button>
                    </div>
                    <Select text="Причина отмены занятия" answers='' />
                    <Button buttonClass="account-btn canceled-btn" buttonName="Отменить занятие" />
                </div>
            </div>
        </div>
    );
}