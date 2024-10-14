import Button from './Button';
import logo from '../img/cento-logo.png'

export default function Header() {
    return (
        <header>
            <img alt="logo" src={logo}></img>
            <Button buttonName="ОГЭ"/>
            <Button buttonName="ЕГЭ"/>
            <Button buttonName="Другие направления"/>
            <Button buttonName="Контакты"/>
            <Button buttonName="Личный кабинет"/>
        </header>
    )
}