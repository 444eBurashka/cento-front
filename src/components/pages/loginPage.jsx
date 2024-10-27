import Header from "../Header";
import Footer from "../Footer";
import PageTitle from "../PageTitle";


export default function LoginPage(props) {
    return (
        <div className="App">
            <Header />
            <PageTitle pageName="САМОЕ ВРЕМЯ ВЕРНУТЬСЯ К ЗАНЯТИЯМ!"/>
            <Footer />
        </div>
      );
}