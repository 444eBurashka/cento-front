import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import DataChanger from "../components/DataChanger";
import SubTitle from "../components/SubTitle";
import ImageSlider from "../components/FinSlider";
import FinStates from "../components/FinStates";
import Button from "../components/Button";
import Select from "../components/Select";


const stateLabels = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг"];
const finData = [
    {
      label: 'Сумма за месяц',
      data: [10, 20, 30, 40, 50, 0, 0, 0],
      backgroundColor: "rgba(204, 255, 149, 1)", 
    }];
const answersData = {
    "math": 'Математика',
    "info": "Информатика"
};

export default function FinanceReport(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-container FinanceReport">
                <div>
                    <PageTitle pageName="ФИНАНСОВАЯ ОТЧЕТНОСТЬ" />
                    <DataChanger 
                        text='МАЙ 2024'
                    /> 
                    <div>
                        <SubTitle pageName='ОПЛАЧЕННЫЕ ЗАНЯТИЯ'></SubTitle>
                        <ImageSlider />
                    </div>
                    <div>
                        <SubTitle pageName='НЕОПЛАЧЕННЫЕ ЗАНЯТИЯ'></SubTitle>
                        <ImageSlider />
                    </div>
                </div>
                <div className="fin-states-container">
                    <div className="fin-states-title-container">
                        <p className="fin-states-title">Ваш доход</p>
                        <Button buttonName='подробнее' buttonClass='account-btn'></Button>
                    </div>
                    <p>За май 2024 вы заработали</p>
                    <p className="fin-states-benefit">100000 рублей </p>
                    <FinStates finLabels={stateLabels} finData={finData}/>
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