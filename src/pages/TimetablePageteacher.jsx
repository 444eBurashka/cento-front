import React from 'react';
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

export default function TimetableteacherPage() {
    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="МОЕ РАСПИСАНИЕ" />
                <div>
                    <div className='timetable-info'>
                        <DataChanger text="19-27 МАРТА"></DataChanger>
                        <Button buttonName="+ добавить занятие" buttonClass="account-btn"></Button>
                    </div>
                    <Calendar firstDate="19"></Calendar>
                    <div className='lessons-planners'>
                        <div className="lessons-planners-item" day-id='0'>
                            <LessonPlanT time='12:00' status='проведено' subject='Информатика' lessonName='Основы программирования на Python' lessonStudent='Иванов И.И.' lessonLinkName='в конференц-зал'></LessonPlanT>
                            <LessonPlanT time='16:00' status='на проверке' subject='Математика' lessonName='Дедлайн по работе №3' lessonStudent='Сидоров В.С.' lessonLinkName='к заданию'></LessonPlanT>
                        </div>
                        <div className="lessons-planners-item" day-id='1'>
                            <LessonPlanT time='14:00' status='идет' subject='Русский язык' lessonName='Консультация' lessonStudent='Иванов И.И., Сидоров В.С., +3 ученика' lessonLinkName='в конференц-зал'></LessonPlanT>
                        </div>
                        <div className="lessons-planners-item" day-id='2'>

                        </div>
                        <div className="lessons-planners-item" day-id='3'>
                            <LessonPlanT time='14:00' status='запланировано' subject='Математика' lessonName='Консультация' lessonStudent='Иванов И.И.' lessonLinkName='в конференц-зал'></LessonPlanT>
                            <LessonPlanT time='17:00' status='не выполнено' subject='Математика' lessonName='Дедлайн по работе №7' lessonStudent='Иванов И.И.' lessonLinkName='к заданию'></LessonPlanT>
                        </div>
                        <div className="lessons-planners-item" day-id='4'>
                            <LessonPlanT time='10:00' statusClass='canceled-status' status='отменено (п)' subject='Математика' lessonStudent='Иванов И.И.' lessonName='Консультация' lessonLinkName='в конференц-зал'></LessonPlanT>
                        </div>
                        <div className="lessons-planners-item" day-id='5'>

                        </div>
                        <div className="lessons-planners-item" day-id='6'>

                        </div>
                    </div>
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