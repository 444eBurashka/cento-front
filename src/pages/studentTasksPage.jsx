import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import TaskInfoWrapper from "../components/TaskInfoWrapper";

export default function StudentTasksPage(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="МОИ ЗАДАНИЯ"/>
                <div className="tasks-list">
                    <TaskInfoWrapper taskName="Отработка задания №4" taskSubject="ОГЭ (Физика)" taskStatus="задано"/>
                    <TaskInfoWrapper taskName="Пробный вариант" taskSubject="ОГЭ (Физика)" taskStatus="на проверке"/>
                    <TaskInfoWrapper taskName="Отработка задания №18" taskSubject="ОГЭ (Физика)" taskStatus="проверено"/>
                </div>
            </div>
            <Footer />
        </div>
      );
}