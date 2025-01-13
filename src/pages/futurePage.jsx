import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Form from "../components/Form";

export default function FuturePage(props) {
    return (
        <div className="App future-page">
            <Header />
            <div className="page-container">
                <h1>ПОКА ЧТО НА ЭТОЙ СТРАНИЦЕ НИЧЕГО НЕТ, НО СКОРО ОНА ПОЯВИТСЯ НА НАШЕМ СЕРВИСЕ</h1>
            </div>
            <Footer />
        </div>
      );
}