import Header from "../Header";
import Footer from "../Footer";
import PageTitle from "../PageTitle";


export default function MainPage(props) {
    return (
        <div className="App">
            <Header />
            <div>
            <PageTitle pageName="МЕНЯЕМ СТРУКТУРУ ПОДГОТОВКИ К " pageNameItalic="ЭКЗАМЕНАМ"/>
                <p className="text-info"><b>Cento</b> – сервис для репетиторов и учеников по подготовке к ЕГЭ и ОГЭ. 
                    Сюда бы ещё немного текста, но я пока не придумала какой, о думаю примерно столько будет в самый раз.
                    <br></br>Занимайся с комфортом.</p>
            </div>
            <Footer />
        </div>
      );
}