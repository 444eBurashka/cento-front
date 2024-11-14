import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Rate from "../components/Rate";

export default function MainPage(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <div>
                    <PageTitle pageName="МЕНЯЕМ СТРУКТУРУ ПОДГОТОВКИ К " pageNameItalic="ЭКЗАМЕНАМ"/>
                    <p className="text-info"><b>Cento</b> – сервис для репетиторов и учеников по подготовке к ЕГЭ и ОГЭ. 
                        Сюда бы ещё немного текста, но я пока не придумала какой, о думаю примерно столько будет в самый раз.
                        <br></br>Занимайся с комфортом.</p>
                        <Button buttonClass="account-btn" buttonName="самое время начать"></Button>
                </div>
                <div>
                    <PageTitle pageName="ПРЕПОДАВАТЕЛЯМ"></PageTitle>
                    <p>*выберете тарифный план, подходящий именно вам. 
                    В любой момент его можно сменить.</p>
                    <div className="rate-wrapper">
                        <Rate name="БАЗОВЫЙ" description="все что нужно для комфорта" price="1000₽"></Rate>
                        <Rate name="ПРОДВИНУТЫЙ" description="все что нужно, и немного больше" price="1500₽"></Rate>
                        <Rate name="V.I.P." description="не, ну ты вообще.." price="2000₽"></Rate>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      );
}