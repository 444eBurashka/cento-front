import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Field from "../components/Field";
import avatar from '../img/defaultAvatar.png';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTokens, clearTokens } from '../store/store.js';


export default function AccountTeacher(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearTokens());
        console.log("Выход из системы");
        navigate('/');
    };

    return (
        <div className="App">
            <Header />
            <div className="page-container">
                <div>
                    <div className="profile-container">
                        <PageTitle pageName="ПРОФИЛЬ"/>
                        {/* <Button buttonName="Редактировать" buttonClass="editBtn"/> */}
                        <Button buttonName="Выйти" buttonClass="editBtn" onClick={handleLogout} />
                    </div>
                    <div className="info-container">
                        <img src={avatar} alt="Avatar" className='avatar'></img>
                        <div className="fields-container">
                            <Field fieldLabel="Логин" fieldText="Иванов Иван Иванович"/>
                            <Field fieldLabel="Почта" fieldText="i.i.ivanov@mail.ru"/>
                            <Field fieldLabel="Специализация" fieldText="Подготовка к ОГЭ и ЕГЭ по физике"/>
                        </div>
                        <p className="mainQuote">Ключевое в подготовке - <br></br>правильный подход к решению задачи! </p>
                    </div>
                    <PageTitle pageName="ОБРАЗОВАНИЕ"/>
                    <p>Закончил ведущий лицей №108 в г. Москва. В 2014 году поступил в Институт новых материалов и технологий УрФУ на программу “Металлургия и инновационные решение”. 
                        Продолжил свое обучение в магистратуре ядерной физики. Опыт подготовки к экзаменам ОГЭ и ЕГЭ по физике 3 года.</p>
                </div>
            </div>
            <Footer />
        </div>
      );
}