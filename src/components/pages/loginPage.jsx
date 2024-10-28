import Header from "../Header";
import Footer from "../Footer";
import PageTitle from "../PageTitle";
import Form from "../Form";

export default function LoginPage(props) {
    return (
        <div className="App">
            <Header />
            <div className="loginPage-Container">
                <div>
                    <PageTitle pageName="САМОЕ ВРЕМЯ ВЕРНУТЬСЯ К " pageNameItalic="ЗАНЯТИЯМ!"/>
                    <p className="text-info"><b>Cento</b> – сервис для репетиторов и учеников по подготовке к ЕГЭ и ОГЭ. 
                        Сюда бы ещё немного текста, но я пока не придумала какой, о думаю примерно столько будет в самый раз.
                        <br></br>
                        <br></br>
                        Занимайся с комфортом.</p>
                </div>
                <Form />
            </div>
            <Footer />
        </div>
      );
}