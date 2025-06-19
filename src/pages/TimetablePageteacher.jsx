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
import DeleteBtn from '../img/delete.png';
import PayBtn from '../img/pay.png';
import SubjectBtn from '../img/subject-lesson.png';
import ColorBtn from '../img/color-lesson.png';

import { APIURL } from '../data';

// Добавляем список предметов с ID
const subjects = [
    { id: 1, name: 'Информатика' },
    { id: 2, name: 'Математика' },
    { id: 3, name: 'Физика' }
];

export default function TimetableteacherPage() {
    const accessToken = useSelector(state => state.auth.accessToken);

    const [showAddLessonForm, setShowAddLessonForm] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showLessonDetails, setShowLessonDetails] = useState(false);
    const [weekOffset, setWeekOffset] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [editingLesson, setEditingLesson] = useState(null);

    const [newLesson, setNewLesson] = useState({
        title: 'Введите тему занятия',
        subject_id: 1,
        subject_name: 'Информатика',
        datetime: '',
        student_id: '',
        is_repetitive: false,
        color: '#3a86ff',
        comment: '',
        lesson_cost: 0
    });

    // Получаем список учеников
    const fetchStudents = async () => {
        try {
            const response = await fetch(APIURL + 'profile/', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            });
            const data = await response.json();
            setStudents(data.students || []);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Обновляем обработчик изменений для select предмета
    const handleSubjectChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedSubject = subjects.find(subj => subj.id === selectedId);
        
        if (editingLesson) {
            setEditingLesson(prev => ({
                ...prev,
                subject_id: selectedId,
                subject_name: selectedSubject.name
            }));
        } else {
            setNewLesson(prev => ({
                ...prev,
                subject_id: selectedId,
                subject_name: selectedSubject.name
            }));
        }
    };

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

    // Обработчики изменений формы
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingLesson) {
            setEditingLesson(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setNewLesson(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (editingLesson) {
            setEditingLesson(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setNewLesson(prev => ({
                ...prev,
                [name]: checked
            }));
        }
    };

    // Функция для редактирования занятия
    const handleEditLesson = (lesson) => {
        setEditingLesson({
            id: lesson.id,
            title: lesson.lesson_name,
            subject_id: lesson.exam_info.id,
            subject_name: lesson.exam_info.name,
            datetime: lesson.datetime.slice(0, 16), // форматируем для datetime-local
            student_id: lesson.student_info.student_id,
            is_repetitive: lesson.is_repetitive,
            color: lesson.color,
            comment: lesson.teacher_comment || '',
            lesson_cost: lesson.lesson_cost || 0
        });
        setShowAddLessonForm(true);
        setShowLessonDetails(false);
    };

    // Отправка нового или обновленного занятия
    const handleSaveLesson = async () => {
        try {
            const url = editingLesson 
                ? `${APIURL}schedule-elements/${editingLesson.id}/` 
                : `${APIURL}schedule-elements/`;
                
            const method = editingLesson ? 'PUT' : 'POST';
            
            const lessonData = editingLesson ? editingLesson : newLesson;
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: JSON.stringify({
                    lesson_name: lessonData.title,
                    exam_id: lessonData.subject_id,
                    datetime: lessonData.datetime,
                    student_id: lessonData.student_id,
                    is_repetitive: lessonData.is_repetitive,
                    color: lessonData.color,
                    teacher_comment: lessonData.comment,
                    duration: 90,
                    lesson_cost: Number(lessonData.lesson_cost)
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка при сохранении занятия');
            }

            setShowAddLessonForm(false);
            setEditingLesson(null);
            setNewLesson({
                title: 'Введите тему занятия',
                subject_id: 1,
                subject_name: 'Информатика',
                datetime: '',
                student_id: '',
                is_repetitive: false,
                color: '#3a86ff',
                comment: '',
                lesson_cost: 0
            });
            fetchLessons(); // Обновляем список занятий
        } catch (error) {
            console.error('Error saving lesson:', error);
        }
    };

    // Функция для удаления занятия
    const handleDeleteLesson = async () => {
        if (!selectedLesson) return;
        
        try {
            const response = await fetch(`${APIURL}schedule-elements/${selectedLesson.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении занятия');
            }

            setShowLessonDetails(false);
            setSelectedLesson(null);
            fetchLessons(); // Обновляем список занятий
        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
    };

    // Функция для закрытия формы добавления/редактирования
    const handleCloseForm = () => {
        setShowAddLessonForm(false);
        setEditingLesson(null);
        setNewLesson({
            title: 'Введите тему занятия',
            subject_id: 1,
            subject_name: 'Информатика',
            datetime: '',
            student_id: '',
            is_repetitive: false,
            color: '#3a86ff',
            comment: '',
            lesson_cost: 0
        });
    };

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
                        <Button 
                          buttonName="+ добавить занятие" 
                          buttonClass="account-btn"
                          onClick={() => setShowAddLessonForm(true)}
                        />
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

            {/* Модальное окно с деталями занятия */}
            <div className={showLessonDetails ? 'lesson-description' : 'hide lesson-description'}>
                {selectedLesson && (
                    <>
                        <div className='lesson-desc-interface'>
                            <div className='lesson-desc-subject'>{selectedLesson.exam_info.name}</div>
                            <div>
                                <button 
                                    className='lesson-desc-edit-btn'
                                    onClick={() => handleEditLesson(selectedLesson)}
                                >
                                    <img src={EditBtn} alt="Редактировать"/>
                                </button>
                                    <button 
                                        className='lesson-delete-btn'
                                        onClick={handleDeleteLesson}
                                    >
                                    <img src={DeleteBtn} alt="Отменить"/>
                                </button>
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
                                <img src={PeopleBtn} alt="Ученик"/>
                                <div className='lesson-desc-info-text'>{selectedLesson.student_info.name}</div>
                            </div>
                            <div className='repeat-info'>
                                <img src={RepeatBtn} alt="Повтор"/>
                                <div className='lesson-desc-info-text'>{selectedLesson.is_repetitive ? 'Повторяется каждую неделю' : 'Не повторяется'}</div>
                            </div>
                            <div className='cost-info'>
                                <img src={PayBtn} alt="Стоимость"/>
                                <div className='lesson-desc-info-text'>
                                    Стоимость: {selectedLesson.lesson_cost || 0} руб.
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='lesson-desc-title'>Комментарий к занятию</div>
                            <div className='lesson-desc-text'>{selectedLesson.teacher_comment || 'Комментарий отсутствует'}</div>
                            <div className='lesson-desc-input-comment'>
                                <input placeholder="Оставить комментарий"></input>
                                <button><img src={SendBtn} alt="Отправить"/></button>
                            </div>
                        </div>
                        
                    </>
                )}
            </div>

            {/* Форма добавления/редактирования занятия */}
            <div className={showAddLessonForm ? 'lesson-add' : 'hide lesson-add'}>
                <div className='lesson-add-interface'>
                    <div className='lesson-add-subject'>
                        {editingLesson ? 'Редактирование занятия' : 'Новое занятие'}
                    </div>
                    <div>
                        <Button 
                            buttonName='Сохранить' 
                            buttonClass='editBtn saveBtn'
                            onClick={handleSaveLesson}
                        />
                        <button 
                            className='lesson-add-close-btn'
                            onClick={handleCloseForm}
                        >
                            <img src={CloseBtn} alt="Закрыть"/>
                        </button>
                    </div>
                </div>
                
                <input
                    type="text"
                    className='lesson-add-name'
                    value={editingLesson ? editingLesson.title : newLesson.title}
                    name="title"
                    onChange={handleInputChange}
                />
                
                <div className='lesson-add-item'>
                    <div className='time-info'>
                        <img src={TimeBtn} alt="Время"/>
                        <input
                            type="datetime-local"
                            className='lesson-add-info-text'
                            value={editingLesson ? editingLesson.datetime : newLesson.datetime}
                            name="datetime"
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className='people-info'>
                        <img src={PeopleBtn} alt="Ученик"/>
                        <select
                            className='lesson-add-info-text'
                            value={editingLesson ? editingLesson.student_id : newLesson.student_id}
                            name="student_id"
                            onChange={handleInputChange}
                        >
                            <option value="">Выберите ученика</option>
                            {students.map(student => (
                                <option key={student.student_id} value={student.student_id}>
                                    {student.student_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className='repeat-info'>
                        <img src={RepeatBtn} alt="Повтор"/>
                        <label className='lesson-add-info-text'>
                            <input
                                type="checkbox"
                                checked={editingLesson ? editingLesson.is_repetitive : newLesson.is_repetitive}
                                name="is_repetitive"
                                onChange={handleCheckboxChange}
                            />
                            {editingLesson ? editingLesson.is_repetitive ? 'Повторять каждую неделю' : 'Не повторять' 
                             : newLesson.is_repetitive ? 'Повторять каждую неделю' : 'Не повторять'}
                        </label>
                    </div>
                    
                    <div className='subject-info'>
                        <img src={SubjectBtn} alt="Предмет"/>
                        <select
                            className='lesson-add-info-text'
                            value={editingLesson ? editingLesson.subject_id : newLesson.subject_id}
                            onChange={handleSubjectChange}
                        >
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className='color-info'>
                        <img src={ColorBtn} alt="Цвет"/>
                        <input
                            type="color"
                            className='lesson-add-info-text'
                            value={editingLesson ? editingLesson.color : newLesson.color}
                            name="color"
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className='cost-info'>
                        <img src={PayBtn} alt="Стоимость"/>
                        <input
                            type="number"
                            className='lesson-add-info-text'
                            value={editingLesson ? editingLesson.lesson_cost : newLesson.lesson_cost}
                            name="lesson_cost"
                            onChange={handleInputChange}
                            min="0"
                        />
                    </div>
                </div>
                
                <div className='lesson-add-footer'>
                    <div className='lesson-add-title'>Комментарий к занятию</div>
                    <textarea
                        className='lesson-add-text'
                        value={editingLesson ? editingLesson.comment : newLesson.comment}
                        name="comment"
                        onChange={handleInputChange}
                        placeholder="Введите комментарий..."
                    />
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