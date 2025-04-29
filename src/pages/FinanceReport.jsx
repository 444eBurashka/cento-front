import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import DataChanger from "../components/DataChanger";
import SubTitle from "../components/SubTitle";
import ImageSlider from "../components/FinSlider";

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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      );
}