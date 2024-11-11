import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Select from "../components/Select";
import Search from "../components/Search";
import Task from "../components/Task";
import taskImage from '../img/taskImage.png';

const status='found';

export default function TasksBasePage(props) {
    const addClassTasks = status==='found' ? '' : 'hide';
    const addClassInfo = status==='found' ? 'hide' : '';
    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="БАНК ЗАДАНИЙ"/>
                <div className="search-container">
                    <Search></Search>
                    <Select></Select>
                </div>
                <div className={"notfoundTitle " + addClassInfo}>
                    <p>К СОЖАЛЕНИЮ, ПО ВАШЕМУ <br></br> ЗАПРОСУ НИЧЕГО НЕ НАЙДЕНО</p>
                </div>
                <div className={"base-tasks-list " + addClassTasks}>
                    <Task id='1' description='На рисунке изображён график функции y=f(x). 
                    На оси абсцисс отмечено девять точек: x1, x2, x3, x4, x5, x6, x7, x8, x9. 
                    Найдите количество отмеченных точек, в которых производная функции f(x) отрицательна.' image={taskImage} answer="6"></Task>
                    <Task id="2" description="На олимпиаде по математике 550 участников разместили в четырёх аудиториях. В первых трёх удалось разместить по 110 человек, оставшихся перевели в запасную аудиторию в другом корпусе. 
                    Найдите вероятность того, что случайно выбранный участник писал олимпиаду в запасной аудитории." answer="6"></Task>
                </div>
            </div>
            <Footer />
        </div>
      );
}