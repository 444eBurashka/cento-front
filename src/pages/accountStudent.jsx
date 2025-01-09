import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Field from "../components/Field";
import avatar from '../img/defaultAvatar.png';
import SectionButton from "../components/SectionButton";

export default function AccountTeacher(props) {
    return (
        <div className="App">
            <Header />
            <div className="page-container">
                <div className="page-container-fix">
                    <div className="profile-container">
                        <PageTitle pageName="ПРОФИЛЬ"/>
                        {/* <Button buttonName="Редактировать" buttonClass="editBtn"/> */}
                    </div>
                    <div className="info-container">
                        <img src={avatar} alt="Avatar" className='avatar'></img>
                        <div className="fields-container">
                            <Field fieldLabel="ФИО" fieldText="Денисов Денис Денисович"/>
                            <Field fieldLabel="Почта" fieldText="d.d.denisov@gmail.com"/>
                            <Field fieldLabel="Класс" fieldText="11"/>
                        </div>
                        <div className="subjects-section">
                            <h3>Изучаемые предметы</h3>
                            <p>Профильная математика</p>
                            <p>Русский язык</p>
                            <p>Физика</p>
                        </div>
                    </div>
                    <PageTitle pageName="ПРЕПОДАВАТЕЛИ"/>
                    <div className="teachers-container">
                        <SectionButton />
                        <SectionButton />
                        <SectionButton />
                        <SectionButton />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      );
}