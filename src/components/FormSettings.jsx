import Select from "./Select";
import SelectedPeople from "./selectedPeople";
import Button from "./Button";

const DataSettings = {
    title: 'Конференция',
    submitBtnText: 'В конференцию', 
    prevBtnText: 'Отмена',
};
const settingsVariants = ['Запуск конференции мгновенно', 'Запуск в определенное время'];
const settingsPeople = ['Иванов Иван', 'Петров Петр', 'Денисов Дмитрий', 'Ксения Попова'];
const selectedPeople = [];

export default function FormSettings() {
    return (
        <form className="Form FormSettings">
            <h2>{DataSettings.title}</h2>
            <div className="fields-container">
                <div className="select-container">
                    <span>Вариант запуска</span>
                    <Select selectClass='settings' answers={settingsVariants} text='Выберите способ запуска'></Select>
                </div>
                <div className="select-container">
                    <span>Ученики</span>
                    <Select selectClass='settings' answers={settingsPeople} text='Выберите ученика'></Select>
                </div>
            </div>
            <div className="selectedPeople-container">
                <SelectedPeople text='Дмитриев Денис'/>
            </div>
            <div className="buttons-container">
                <Button buttonName={DataSettings.prevBtnText} buttonClass="edit-btn"/>
                <Button buttonName={DataSettings.submitBtnText} buttonClass="account-btn"/>
            </div>
        </form>
    )
}