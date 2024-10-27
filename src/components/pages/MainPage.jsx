import Header from "../Header";
import Footer from "../Footer";
import PageTitle from "../PageTitle";


export default function MainPage(props) {
    return (
        <div className="App">
            <Header />
            <PageTitle pageName="МЕНЯЕМ СТРУКТУРУ ПОДГОТОВКИ К " pageNameItalic="ЭКЗАМЕНАМ"/>
            <Footer />
        </div>
      );
}