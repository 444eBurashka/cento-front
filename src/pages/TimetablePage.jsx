import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import DataChanger from '../components/DataChanger';
import Calendar from '../components/Calendar';
import LessonPlan from '../components/LessonPlan';

export default function TasksBasePage() {
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
        </div>
    );
}