import Button from './Button';
import logo from '../img/cento-logo.png'

export default function Header() {
    return (
        <header className='Header'>
            <img alt="logo" src={logo} className='logo'></img>
            <div className='navigation'>
                <Button buttonName="ОГЭ"/>
                <Button buttonName="ЕГЭ"/>
                <Button buttonName="Другие направления"/>
                <Button buttonName="Контакты"/>
                <Button buttonName="Личный кабинет" buttonClass="account-btn"/>
            </div>
        </header>
    )
}