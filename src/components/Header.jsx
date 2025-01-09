import {Link} from 'react-router-dom';

import Button from './Button';
import logo from '../img/cento-logo.png'

import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const role = useSelector(state => state.auth.role);

    console.log('Role:', role);
    console.log('Access Token:', accessToken);

    let urlLogin = '';
    if (role !== null) {
        urlLogin = role;
    }
    else {
        urlLogin = '/login';
    }

    return (
        <header className='Header'>
            <Link to="/">
                <img alt="logo" src={logo} className='logo'></img>
            </Link>
            <div className='navigation'>
                <Button buttonName="Банк заданий"/>
                <Button buttonName="Другие направления"/>
                <Button buttonName="Контакты"/>
                <Link to={urlLogin}>
                    <Button buttonName="Личный кабинет" buttonClass="account-btn"/>
                </Link>
            </div>
        </header>
    )
}