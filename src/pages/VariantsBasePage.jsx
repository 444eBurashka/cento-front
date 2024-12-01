import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Search from "../components/Search";
import Variant from "../components/Variant";
import Button from "../components/Button";
import Select from "../components/Select";

const status='found';
const formatExamAnswers={
    "OGE":'ОГЭ', 
    "EGE":"ЕГЭ"}
const students={
    "1":'Иванов', 
    "2":"Петров", 
    "3":"Сидоров"}

export default function TasksBasePage(props) {
    const addClassTasks = status==='found' ? '' : 'hide';
    const addClassInfo = status==='found' ? 'hide' : '';
    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="БАНК ВАРИАНТОВ"/>
                <div className="search-container">
                    <Search textSearch="Поиск по номеру варианта"></Search>
                </div>
                <div className={"notfoundTitle " + addClassInfo}>
                    <p>К СОЖАЛЕНИЮ, ПО ВАШЕМУ <br></br> ЗАПРОСУ НИЧЕГО НЕ НАЙДЕНО</p>
                </div>
                <div className={"base-variants-list " + addClassTasks}>
                    <Variant text="Вариант 1"></Variant>
                    <Variant text="Вариант 2"></Variant>
                    <Variant text="Вариант 3"></Variant>
                    <Variant text="Вариант 4"></Variant>
                    <Variant text="Вариант 5"></Variant>
                    <Variant text="Вариант 6"></Variant>
                    <Variant text="Вариант 7"></Variant>
                    <Variant text="Вариант 8"></Variant>
                    <Variant text="Вариант 9"></Variant>
                    <Variant text="Вариант 10"></Variant>
                </div>
                <Button buttonName="Задать вариант" buttonClass="account-btn"></Button>
            </div>
            <Footer />
            <div className="hide popup-overlay">
                <div className="popup">
                    <div className="title-wrapper">
                        <p>Выберите формат экзамена</p>
                        <button className="cross-btn"></button>
                    </div>
                    <Select text="Ученики" answers={students}></Select>
                    <Select text="Режим экзамена" answers={formatExamAnswers}></Select>
                    <Select text="Срок выполнения" answers={formatExamAnswers}></Select>
                    <Button buttonClass="account-btn" buttonName="Задать вариант ученикам"></Button>
                </div>
            </div>
        </div>
      );
}