import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import FormSettings from "../components/FormSettings";

export default function VideoSettings(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-container">
                <div>
                    <PageTitle pageName="СОВСЕМ СКОРО МЫ ЗАПУСТИМ КОНФЕРЕНЦИЮ, А ПОКА ДАВАЙТЕ ЕЁ " pageNameItalic="НАСТРОИМ!"/>
                </div>
                <FormSettings />
            </div>
            <Footer />
        </div>
      );
}