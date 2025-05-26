import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import DataChanger from "../components/DataChanger";
import SubTitle from "../components/SubTitle";
import ImageSlider from "../components/FinSlider";
import FinStates from "../components/FinStates";
import Button from "../components/Button";
import Select from "../components/Select";
import { APIURL } from '../data';

const monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
const shortMonthNames = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

const answersData = {
    "math": 'Математика',
    "info": "Информатика"
};

export default function FinanceReport(props) {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [paidLessons, setPaidLessons] = useState([]);
    const [unpaidLessons, setUnpaidLessons] = useState([]);
    const [monthOffset, setMonthOffset] = useState(0);
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);

    // Получаем даты начала и конца для 7 месяцев (текущий + 6 предыдущих)
    const getDateRangeForStats = () => {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + monthOffset + 1, 0);
        
        const startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 6, 1);
        
        return {
            startDate: new Date(startDate.setHours(0, 0, 0, 0)),
            endDate: new Date(endDate.setHours(23, 59, 59, 999))
        };
    };

    // Получаем даты начала и конца текущего месяца (с учетом смещения)
    const getCurrentMonthDateRange = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + monthOffset;
        
        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = new Date(currentYear, currentMonth + 1, 0);
        
        return {
            startDate,
            endDate
        };
    };

    const formatDateToAPI = (date) => {
        return date.toISOString().split('T')[0];
    };

    const formatDateForDisplay = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    const formatTimeForDisplay = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const formatMonthYear = () => {
        const { startDate } = getCurrentMonthDateRange();
        const month = startDate.toLocaleString('ru', { month: 'long' }).toUpperCase();
        const year = startDate.getFullYear();
        return `${month} ${year}`;
    };

    // Запрос статистики за 7 месяцев
    const fetchStatistics = async () => {
        try {
            const { startDate, endDate } = getDateRangeForStats();
            
            const response = await fetch(APIURL + 'finance/stats/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    start_date: formatDateToAPI(startDate),
                    end_date: formatDateToAPI(endDate)
                })
            });
            
            const data = await response.json();
            processStatsData(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    // Обработка данных статистики для графика
    const processStatsData = (statsData) => {
        const monthsData = [];
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + monthOffset);
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setMonth(date.getMonth() - i);
            
            const year = date.getFullYear();
            const monthName = monthNames[date.getMonth()];
            const shortMonthName = shortMonthNames[date.getMonth()];
            
            let monthIncome = 0;
            if (statsData[year] && statsData[year][monthName]) {
                monthIncome = Object.values(statsData[year][monthName]).reduce((sum, val) => sum + val, 0);
            }
            
            monthsData.push({
                shortName: shortMonthName,
                income: monthIncome
            });
        }
        
        setMonthlyStats(monthsData);
        
        if (monthsData.length > 0) {
            setTotalIncome(monthsData[monthsData.length - 1].income);
        }
    };

    // Запрос занятий по статусу оплаты
    const fetchLessons = async (paymentStatus) => {
        try {
            const { startDate, endDate } = getCurrentMonthDateRange();
            
            const response = await fetch(APIURL + 'lessons/payment/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payment_status: paymentStatus,
                    start_date: formatDateToAPI(startDate),
                    end_date: formatDateToAPI(endDate)
                })
            });
            
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${paymentStatus} lessons:`, error);
            return [];
        }
    };

    // Получение данных за текущий месяц
    const fetchMonthStatistics = async () => {
        const [paidData, unpaidData] = await Promise.all([
            fetchLessons('paid'),
            fetchLessons('not_paid')
        ]);

        setPaidLessons(paidData || []);
        setUnpaidLessons(unpaidData || []);
    };

    const handlePrevMonth = () => {
        setMonthOffset(prev => prev - 1);
    };

    const handleNextMonth = () => {
        setMonthOffset(prev => prev + 1);
    };

    const handleMarkAsPaid = async (lessonId) => {
        try {
            const response = await fetch(`${APIURL}schedule-elements/${lessonId}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payment_status: "paid"
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении статуса оплаты');
            }

            await fetchMonthStatistics();
            await fetchStatistics();
            
            console.log('Оплата успешно отмечена');
            
        } catch (error) {
            console.error('Error marking lesson as paid:', error);
        }
    };

    const prepareSliderData = (lessons, isPaid) => {
        return lessons.map(lesson => ({
            id: lesson.id,
            date: formatDateForDisplay(lesson.datetime),
            time: formatTimeForDisplay(lesson.datetime),
            theme: lesson.lesson_name,
            student: lesson.student_info?.name,
            subject: lesson.exam_info?.name,
            cost: lesson.lesson_cost,
            isPaid: isPaid,
            onPaymentClick: () => handleMarkAsPaid(lesson.id)
        }));
    };

    const prepareFinStatesData = () => {
        return {
            finLabels: monthlyStats.map(month => month.shortName),
            finData: [{
                label: 'Доход',
                data: monthlyStats.map(month => month.income),
                backgroundColor: 'rgba(204, 255, 149, 1)',
                borderColor: 'rgba(204, 255, 149, 1)',
                borderWidth: 1
            }]
        };
    };

    useEffect(() => {
        fetchMonthStatistics();
        fetchStatistics();
    }, [monthOffset]);
    

    return (
        <div className="App">
            <Header />
            <div className="page-container FinanceReport">
                <div>
                    <PageTitle pageName="ФИНАНСОВАЯ ОТЧЕТНОСТЬ" />
                    <DataChanger 
                        text={formatMonthYear()}
                        onPrevClick={handlePrevMonth}
                        onNextClick={handleNextMonth}
                    /> 
                    <div>
                        <SubTitle pageName='ОПЛАЧЕННЫЕ ЗАНЯТИЯ' />
                        <ImageSlider 
                            items={prepareSliderData(paidLessons, true)} 
                            emptyMessage="Нет оплаченных занятий за этот период"
                        />
                    </div>
                    <div>
                        <SubTitle pageName='НЕОПЛАЧЕННЫЕ ЗАНЯТИЯ' />
                        <ImageSlider 
                            items={prepareSliderData(unpaidLessons, false)} 
                            emptyMessage="Нет неоплаченных занятий за этот период"
                        />
                    </div>
                </div>
                <div className="fin-states-container">
                    <div className="fin-states-title-container">
                        <p className="fin-states-title">Ваш доход</p>
                        <Button buttonName='подробнее' buttonClass='account-btn' />
                    </div>
                    <p>За {formatMonthYear()} вы заработали</p>
                    <p className="fin-states-benefit">{totalIncome.toFixed(2)} рублей</p>
                    <FinStates {...prepareFinStatesData()} />
                </div>
            </div>
            <Footer />

            <div className="hide popup-overlay">
                <div className="popup finance-popup">
                    <div className="title-wrapper">
                        <p>Финансовый отчет</p>
                        <button className="cross-btn"></button>
                    </div>
                    <Select text="Выберите предмет" answers={answersData}></Select>
                    <p className="date-select">Дата начала отчета</p>
                    <input className='date-select-input' type="date" id="start" name="trip-start" value="2018-01-01" min="2018-01-01" max="2018-12-31" />
                    <p className="date-select">Дата конца отчета</p>
                    <input className='date-select-input' type="date" id="start" name="trip-start" value="2018-01-01" min="2018-01-01" max="2018-12-31" />
                    <Button buttonClass="account-btn" buttonName="Сформировать отчет"></Button>
                </div>
            </div>

            <div className="hide popup-overlay">
                <div className="popup lesson-info-popup">
                    <div className="title-wrapper">
                        <p>Информация о занятии</p>
                        <button className="cross-btn"></button>
                    </div>
                    <div className="lesson-info-popup-container">
                        <div className="lesson-info-popup-subtitle-container">
                            <p className="lesson-info-popup-subtitle">Ученик</p>
                            <p>Иванов Иван Иванович</p>
                        </div>
                        <div className="lesson-info-popup-subtitle-container">
                            <p className="lesson-info-popup-subtitle">Предмет</p>
                            <p>Информатика</p>
                        </div>
                        <div className="lesson-info-popup-subtitle-container">
                            <p className="lesson-info-popup-subtitle">Дата занятия</p>
                            <p>12.05.2025 14:00</p>
                        </div>
                        <div className="lesson-info-popup-subtitle-container">
                            <p className="lesson-info-popup-subtitle">Тема занятия</p>
                            <p>Подготовка к ЕГЭ №13</p>
                        </div>
                    </div>
                    <div className="popup-price-container">
                        <p className="popup-price-title">Сумма к оплате:</p>
                        <p className="popup-price-sum">1300 рублей</p>
                    </div>
                    <Button buttonClass="account-btn" buttonName="Оплатить"></Button>
                </div>
            </div>
        </div>
    );
}