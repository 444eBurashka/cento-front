import Button from "./Button";
import Input from "./Input";

export default function Form(props) {
    return(
        <form className="Form">
            <h2>Личный кабинет</h2>
            <Input textLabel="Логин" placeholder="Введите почту или номер телефона"/>
            <Input textLabel="Пароль" placeholder="Введите пароль"/>
            <Button buttonName="Войти в аккаунт" buttonClass="account-btn"/>
            <div>
                <p>Ещё нет аккаунта?</p>
                <Button buttonName="Зарегистрироваться"></Button>
            </div>
        </form>
    )
}