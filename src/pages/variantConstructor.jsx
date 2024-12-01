import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Task from "../components/Task";
import taskImage from '../img/taskImage.png';
import Button from "../components/Button";

const status = "1";
const addClassF = status === "0" ? "" : "hide";
const addClassS = status === "1" ? "" : "hide";

export default function VariantConstructor(props) {
    return (
        <div className="App">
            <Header />
            <div className={"page-container-column " + addClassF}>
                <PageTitle pageName="КОНСТРУКТОР ВАРИАНТОВ"/>
                <div className={"base-tasks-list "}>
                    <Task taskClass="notEditable" id='1' description='На рисунке изображён график функции y=f(x). 
                    На оси абсцисс отмечено девять точек: x1, x2, x3, x4, x5, x6, x7, x8, x9. 
                    Найдите количество отмеченных точек, в которых производная функции f(x) отрицательна.' image={taskImage} answer="6"></Task>
                    <Task taskClass="notEditable" id="2" description="На олимпиаде по математике 550 участников разместили в четырёх аудиториях. В первых трёх удалось разместить по 110 человек, оставшихся перевели в запасную аудиторию в другом корпусе. 
                    Найдите вероятность того, что случайно выбранный участник писал олимпиаду в запасной аудитории." answer="6"></Task>
                </div>
                <div className="variant-interface-container">
                    <Button buttonName="Сохранить вариант" buttonClass="account-btn"></Button>
                    <Button buttonName="Удалить вариант" buttonClass="editBtn"></Button>
                </div>
            </div>
            <div className={"page-container-column " + addClassS}>
                <PageTitle pageName="КОНСТРУКТОР ВАРИАНТОВ"/>
                <div className="variant-constructor-first-step">
                    <Button buttonClass="editBtn" buttonName="-">-</Button>
                    <input></input>
                    <Button buttonClass="editBtn" buttonName="+">+</Button>
                    <p>1. Не, ну это очень интересная тема, правда я понятия не имею о чем она</p>
                </div>
                <div className="variant-constructor-first-step">
                    <Button buttonClass="editBtn" buttonName="-">-</Button>
                    <input></input>
                    <Button buttonClass="editBtn" buttonName="+">+</Button>
                    <p>1. Не, ну это очень интересная тема, правда я понятия не имею о чем она</p>
                </div>
                <div className="variant-constructor-first-step">
                    <Button buttonClass="editBtn" buttonName="-">-</Button>
                    <input></input>
                    <Button buttonClass="editBtn" buttonName="+">+</Button>
                    <p>1. Не, ну это очень интересная тема, правда я понятия не имею о чем она</p>
                </div>
                <div className="variant-constructor-first-step">
                    <Button buttonClass="editBtn" buttonName="-">-</Button>
                    <input></input>
                    <Button buttonClass="editBtn" buttonName="+">+</Button>
                    <p>1. Не, ну это очень интересная тема, правда я понятия не имею о чем она</p>
                </div>
                <div className="variant-constructor-first-step">
                    <Button buttonClass="editBtn" buttonName="-">-</Button>
                    <input></input>
                    <Button buttonClass="editBtn" buttonName="+">+</Button>
                    <p>1. Не, ну это очень интересная тема, правда я понятия не имею о чем она</p>
                </div>
                <Button buttonClass="account-btn" buttonName="Составить вариант">Составить вариант</Button>
            </div>
            <Footer />
        </div>
      );
}