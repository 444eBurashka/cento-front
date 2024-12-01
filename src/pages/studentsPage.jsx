import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Student from "../components/Student";

export default function StudentsPage(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="ВАШИ УЧЕНИКИ"/>
                <div className="students-list">
                    <Student studentName="Денисов Денис" studentClass="11" studentSubject="ОГЭ (Физика)"/>
                    <Student studentName="Денисов Денис" studentClass="11" studentSubject="ОГЭ (Физика)"/>
                    <Student studentName="Денисов Денис" studentClass="11" studentSubject="ОГЭ (Физика)"/>
                    <Student studentName="Денисов Денис" studentClass="11" studentSubject="ОГЭ (Физика)"/>
                </div>
            </div>
            <Footer />
        </div>
      );
}