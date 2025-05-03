import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import DataChanger from "../components/DataChanger";
import SubTitle from "../components/SubTitle";
import ImageSlider from "../components/FinSlider";
import FinStates from "../components/FinStates";
import Button from "../components/Button";

const stateLabels = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг"];
const finData = [
    {
      label: 'Сумма за месяц',
      data: [10, 20, 30, 40, 50, 0, 0, 0],
      backgroundColor: "rgba(204, 255, 149, 1)", 
    }];
const unpayedLessons = [
    {
        date: '12.03',
        time: '12:00',
        subject: 'Информатика',
        student: 'Иванов И.И.',
        theme: 'Основы программирования на Python', 
        price: 1300
    },
    {
        date: '12.03',
        time: '12:00',
        subject: 'Информатика',
        student: 'Иванов И.И.',
        theme: 'Основы программирования на Python',
        price: 1300
    },
    {
        date: '12.03',
        time: '12:00',
        subject: 'Информатика',
        student: 'Иванов И.И.',
        theme: 'Основы программирования на Python',
        price: 1300
    }
]

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
        </div>
      );
}