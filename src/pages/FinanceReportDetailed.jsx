import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import FinStates from "../components/FinStates";
import Button from "../components/Button";

const stateLabels = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг"];
const finData = [
    {
      label: 'Математика',
      data: [80, 100, 95, 80, 50, 0, 0, 0],
      backgroundColor: "rgba(204, 255, 149, 1)", 
    },
    {
      label: 'Русский язык',
      data: [95, 80, 120, 80, 50, 0, 0, 0],
      backgroundColor: "rgba(149, 202, 90, 1)", 
    }];

const detailedInfo = [
    {
        period: 'Январь 2024 (русский язык)',
        money: '80 000 рублей'
    },
    {
        period: 'Январь 2024 (математика)',
        money: '95 000 рублей'
    },
    {
        period: 'Февраль 2024 (русский язык)',
        money: '100 000 рублей'
    },
    {
        period: 'Февраль 2024 (математика)',
        money: '80 000 рублей'
    },
    {
        period: 'Март 2024 (русский язык)',
        money: '95 000 рублей'
    },
    {
        period: 'Март 2024 (математика)',
        money: '120 000 рублей'
    },
    {
        period: 'Апрель 2024 (русский язык)',
        money: '80 000 рублейй'
    },
    {
        period: 'Апрель 2024 (математика)',
        money: '80 000 рублей'
    }
]

export default function FinanceReportDetailed(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-container FinanceReportDetailed">
                <div>
                    <PageTitle pageName="ФИНАНСОВАЯ ОТЧЕТНОСТЬ" />
                    <FinStates finLabels={stateLabels} finData={finData}/>                    
                </div>
                <div className="fin-states-container">
                    <div className="fin-states-title-container">
                        <p className="fin-states-title">Ваш доход</p>
                    </div>
                    <p>За 2024 вы заработали</p>
                    <p className="fin-states-benefit">100000 рублей </p>

                    <div className="fin-detailed-container">
                        {detailedInfo.map((elem) => (
                            <div className="fin-detailed-container-elem">
                                <p>{elem.period}</p>
                                <p>{elem.money}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      );
}