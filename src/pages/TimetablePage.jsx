import React from 'react';
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

export default function TimetablePage() {
    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="МОЕ РАСПИСАНИЕ" />
                <div>
                    <DataChanger text="19-27 МАРТА"></DataChanger>
                    <Calendar firstDate="19"></Calendar>
                    <div className='lessons-planners'>
                        <div className="lessons-planners-item" day-id='0'>
                            <LessonPlan time='12:00' status='проведено' subject='Информатика' lessonName='Занятие с учителем' lessonLinkName='в конференц-зал'></LessonPlan>
                            <LessonPlan time='16:00' status='на проверке' subject='Математика' lessonName='Дедлайн по работе №3' lessonLinkName='к заданию'></LessonPlan>
                        </div>
                        <div className="lessons-planners-item" day-id='1'>
                            <LessonPlan time='14:00' status='идет' subject='Русский язык' lessonName='Консультация' lessonLinkName='в конференц-зал'></LessonPlan>
                        </div>
                        <div className="lessons-planners-item" day-id='2'>

                        </div>
                        <div className="lessons-planners-item" day-id='3'>
                            <LessonPlan time='14:00' status='запланировано' subject='Математика' lessonName='Консультация' lessonLinkName='в конференц-зал'></LessonPlan>
                            <LessonPlan time='17:00' status='не выполнено' subject='Математика' lessonName='Дедлайн по работе №7' lessonLinkName='к заданию'></LessonPlan>
                        </div>
                        <div className="lessons-planners-item" day-id='4'>
                            <LessonPlan time='10:00' statusClass='canceled-status' status='отменено (п)' subject='Математика' lessonName='Консультация' lessonLinkName='в конференц-зал'></LessonPlan>
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
                    <button className='lesson-desc-close-btn'><img src={CloseBtn}></img></button>
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
        </div>
    );
}