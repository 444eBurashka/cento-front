import {Link} from 'react-router-dom';

import Button from './Button';
import logo from '../img/cento-logo.png'

export default function Header() {
    return (
        <header className='Header'>
            <Link to="/">
                <img alt="logo" src={logo} className='logo'></img>
            </Link>
            <div className='navigation'>
                <Button buttonName="ОГЭ"/>
                <Button buttonName="ЕГЭ"/>
                <Button buttonName="Другие направления"/>
                <Button buttonName="Контакты"/>
                <Link to="/login">
                    <Button buttonName="Личный кабинет" buttonClass="account-btn"/>
                </Link>
            </div>
        </header>
    )
}