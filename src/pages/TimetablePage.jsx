import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import DataChanger from '../components/DataChanger';
import Calendar from '../components/Calendar';
import LessonPlan from '../components/LessonPlan';
import CloseBtn from '../img/cross-btn-lesson.png';
import TimeBtn from '../img/time.png';
import SendBtn from '../img/send.png';
import PeopleBtn from '../img/people.png';
import RepeatBtn from '../img/repeat.png';
import Button from '../components/Button';

import { APIURL } from '../data';

export default function TimetablePage() {
    const accessToken = useSelector(state => state.auth.accessToken);

    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showLessonDetails, setShowLessonDetails] = useState(false);

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
            
            const response = await fetch(APIURL + 'student-period-schedule/', {
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

    // Функция для обработки клика на "подробнее"
    const handleShowDetails = (lesson) => {
        setSelectedLesson(lesson);
        setShowLessonDetails(true);
    };

    // Функция для закрытия деталей занятия
    const handleCloseDetails = () => {
        setShowLessonDetails(false);
        setSelectedLesson(null);
    };

    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="МОЕ РАСПИСАНИЕ" />
                <div>
                    <DataChanger 
                        text={formatDateRange()}
                        onPrevClick={handlePrevWeek}
                        onNextClick={handleNextWeek}
                    /> 
                    <Calendar dates={currentWeekDates}></Calendar>
                    {loading ? (
                        <h2>Загрузка расписания...</h2>
                    ) : (
                        <div className='lessons-planners'>
                            {lessonsByDay.map((dayLessons, dayIndex) => (
                                <div className="lessons-planners-item" key={dayIndex} day-id={dayIndex}>
                                    {dayLessons.map((lesson, index) => (
                                        <LessonPlan
                                            key={lesson.id}
                                            time={formatTime(lesson.datetime)}
                                            status={getStatusText(lesson.status)}
                                            subject={lesson.exam_info.name}
                                            lessonName={lesson.lesson_name}
                                            lessonLinkName="подробнее"
                                            onDetailsClick={() => handleShowDetails(lesson)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />

            <div className={showLessonDetails ? 'lesson-description' : 'hide lesson-description'}>
            {selectedLesson && (
                <>
                    <div className='lesson-desc-interface'>
                        <div className='lesson-desc-subject'>{selectedLesson.exam_info.name}</div>
                        <div>
                            <button 
                                className='lesson-desc-close-btn'
                                onClick={handleCloseDetails}
                            >
                                <img src={CloseBtn} alt="Закрыть"/>
                            </button>
                        </div>
                    </div>
                    <div className='lesson-desc-name'>{selectedLesson.lesson_name}</div>
                    <div className='lesson-desc-item'>
                        <div className='time-info'>
                            <img src={TimeBtn} alt="Время"/>
                            <div className='lesson-desc-info-text'>
                                {new Date(selectedLesson.datetime).toLocaleDateString('ru-RU', { 
                                    weekday: 'long', 
                                    day: 'numeric', 
                                    month: 'long' 
                                })}
                            </div>
                            <div className='lesson-desc-info-time'>
                                {formatTime(selectedLesson.datetime)}
                            </div>
                        </div>
                        <div className='people-info'>
                            <img src={PeopleBtn} alt="Учитель"/>
                            <div className='lesson-desc-info-text'>{selectedLesson.teacher_info.name}</div>
                        </div>
                        <div className='repeat-info'>
                            <img src={RepeatBtn}></img>
                            <div className='lesson-desc-info-text'>{selectedLesson.is_repetitive ? 'Повторяется каждую неделю' : 'Не повторяется'}</div>
                        </div>
                    </div>
                    {/* <div className='lesson-desc-hw'>
                        <div className='lesson-desc-title'>Домашнее задание</div>
                        <div className='lesson-desc-text'>Нужно будет прорешать вариант №5 и сделать анализ целевой аудитории</div>
                        <Button buttonName="Перейти к заданию" buttonClass="editBtn"></Button>
                    </div> */}
                    <div>
                        <div className='lesson-desc-title'>Комментарий к занятию</div>
                        <div className='lesson-desc-text'>{selectedLesson.teacher_comment || 'Комментарий отсутствует'}</div>
                    </div>
                </>)}
            </div>
        </div>
    );
}