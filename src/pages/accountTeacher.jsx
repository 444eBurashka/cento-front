import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Field from "../components/Field";
import avatar from '../img/defaultAvatar.png';

export default function AccountTeacher(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-Container">
                <div>
                    <PageTitle pageName="ПРОФИЛЬ"/>
                    <Button buttonName="Редактировать" buttonClass="editBtn"/>
                    <img src={avatar} alt="Avatar" className='avatar'></img>
                    <Field fieldLabel="ФИО" fieldText="Иванов Иван Иванович"/>
                    <Field fieldLabel="Почта" fieldText="i.i.ivanov@mail.ru"/>
                    <Field fieldLabel="Специализация" fieldText="Подготовка к ОГЭ и ЕГЭ по физике"/>
                    <p className="mainQuote">Ключевое в подготовке - правильный подход к решению задачи! </p>
                    <PageTitle pageName="ОБРАЗОВАНИЕ"/>
                    <p>Закончил ведущий лицей №108 в г. Москва. В 2014 году поступил в Институт новых материалов и технологий УрФУ на программу “Металлургия и инновационные решение”. 
                        Продолжил свое обучение в магистратуре ядерной физики. Опыт подготовки к экзаменам ОГЭ и ЕГЭ по физике 3 года.</p>
                </div>
            </div>
            <Footer />
        </div>
      );
}