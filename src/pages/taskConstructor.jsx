import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Select from "../components/Select";
import defaultImage from "../img/defaultImg.png";

const formatExamAnswers={
    "OGE":'ОГЭ', 
    "EGE":"ЕГЭ"}
const examsAnswers={
    "math":'Математика', 
    "info":"Информатика", 
    "rus":"Русский язык"}
const formatAnswers={
    "variants":'Ответ с вариантами', 
    "text":"Развернутый ответ", 
    "table":"Табличный ответ"}

const getCount = count => {
    let content = [];
    for (let i = 0; i < count; i++) {
        content.push(<textarea></textarea>);
    }
    return content;
};

export default function TaskConstructor(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="КОНСТРУКТОР ЗАДАНИЙ"/>
                <Button buttonName="+ добавить задание" buttonClass="account-btn"></Button>
                <div className="task-constructor">
                    <div className="task-constructor-header">
                        <span>Задание №<input></input></span>
                        <Button buttonName="Сохранить задание" buttonClass="account-btn"></Button>
                    </div>
                    <div className="task-constructor-search">
                        <Select selectClass="simple-select" text="Выберете экзамен (ОГЭ/ЕГЭ)" answers={formatExamAnswers}></Select>
                        <Select selectClass="simple-select" text="Выберете предмет" answers={examsAnswers}></Select>
                    </div>
                    <div className="task-constructor-main">
                        <div className="task-constructor-description">
                            <div className="task-constructor-description-wrapper">
                                <button><b>B</b></button>          
                                <button><i>I</i></button>                            
                                <button><u>U</u></button>                            
                                <button>x<sub>2</sub></button>                            
                                <button>x<sup>2</sup></button>                                              
                            </div>
                            <textarea placeholder="Введите текст задачи"></textarea>
                        </div>
                        <div className="task-constructor-image">
                            <div className="task-constructor-image-title">
                                <span>Изображение</span>
                                <button>+</button>
                            </div>
                            <div className="task-constructor-image-wrapper">
                                <img alt="Выберите изображение" src={defaultImage}></img>
                            </div>
                        </div>
                    </div>
                    <p>Правильный ответ</p>
                    <div className="task-constructor-answer">
                        <Select selectClass="simple-select" text="Выберите формат ответа" answers={formatAnswers}></Select>
                        <div className="hide task-constructor-answer-variants-wrapper">
                            <div className="task-constructor-answer-variant">
                                <input type="radio" id="1" value="var1" checked />
                                <label for="1">Вариант 1</label>
                            </div>
                            <div className="task-constructor-answer-variant">
                                <input type="radio" id="2" value="var2" />
                                <label for="2">Вариант 2</label>
                            </div>
                            <div className="task-constructor-answer-variant">
                                <input type="radio" id="3" value="var3" />
                                <label for="3">Вариант 3</label>
                            </div>
                            <div className="task-constructor-answer-variant">
                                <input type="radio" id="4" value="var4" />
                                <label for="4">Вариант 4</label>
                            </div>
                        </div>
                        <div className="hide task-constructor-answer-text-wrapper">
                            <textarea placeholder="Введите правильный ответ"></textarea>
                        </div>
                        <div className="hide task-constructor-answer-table-wrapper">
                            <span id='row-span'>Строки<input></input></span>
                            <span>Столбцы<input></input></span>
                            <div className="task-constructor-answer-table">
                                {getCount(6)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      );
}