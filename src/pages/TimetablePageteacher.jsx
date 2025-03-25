import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import DataChanger from '../components/DataChanger';
import Calendar from '../components/Calendar';
import LessonPlanT from '../components/LessonPlanT';
import Button from '../components/Button';

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
        </div>
    );
}