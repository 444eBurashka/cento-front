import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Rate from "../components/Rate";
import CheckBox from "../components/CheckBox";
import MainPageImg1 from "../img/main-page-1.png";
import MainPageImg2 from "../img/main-page-2.png";

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { APIURL } from "../data";

export default function MainPage(props) {
    const accessToken = useSelector(state => state.auth.accessToken);
    const role = useSelector(state => state.auth.role);
    const [rates, setRates] = useState([]);
    const navigate = useNavigate();

    console.log(accessToken, role);

    useEffect(() => {
        const fetchRates = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            try {
                const response = await fetch(APIURL + "tariff/", options);
                const data = await response.json();
                setRates(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchRates();
    }, []);

    const tologin = () => {
        if (accessToken && role) {
            navigate(role);
        }
        else {
            navigate('/login')
        }
    };

    return (
        <div className="App MainPage">
            <Header />
            <div className="page-container-column">
                <div className="hero-wrapper">
                    <div className="hero-wrapper-left">
                        <PageTitle pageName="МЕНЯЕМ СТРУКТУРУ ПОДГОТОВКИ К " pageNameItalic="ЭКЗАМЕНАМ"/>
                        <p className="text-info"><b>Cento</b> – сервис для репетиторов и учеников по подготовке к ЕГЭ и ОГЭ. 
                            Сюда бы ещё немного текста, но я пока не придумала какой, о думаю примерно столько будет в самый раз.
                            <br></br><br></br>Занимайся с комфортом.</p>
                    </div>
                    <img src={MainPageImg1} alt="Здесь первая важная картинка"></img>
                </div>
                <div className="buttons-wrapper">
                    <Button buttonClass="account-btn" buttonName="самое время начать" onClick={tologin}></Button>
                    <a href="/exam-simulator" className="exam-simulator">
                        <p>СИМУЛЯТОР КЕГЭ</p>
                        <span>– сервис, позволяющий имитировать процесс <br></br> компьютерного единого государственного экзамена</span>
                    </a>
                </div>
                <div className="rates-block-wrapper">
                    <PageTitle pageName="ПРЕПОДАВАТЕЛЯМ"></PageTitle>
                    <p>*выберете тарифный план, подходящий именно вам. <br></br>
                    В любой момент его можно сменить.</p>
                    <div className="rate-wrapper">
                        {
                            rates.map((elem, index)=> {
                                const desc = elem["tariff_info"].split('\n')
                                return (
                                    <Rate key={index} name={ elem["tariff_name"] } description={ desc[0] } price={ elem["price"] } advantages={ desc.slice(1) }></Rate>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="for-students-wrapper">
                    <div>
                        <PageTitle pageName="ЕСЛИ ТЫ УЧЕНИК, ТО СМОТРИ...."></PageTitle>
                        <p>Мы как никто знаем, насколько экзаменационный период может быть нервным, и 
                            поэтому создаем во время подготовки условия максимально приближенные к экзамену. 
                            Благодаря этому нашим ребятам на экзамене максимально спокойно и все знакомо.</p>
                        <div>
                            <CheckBox elem="Фишка 1"></CheckBox>  
                            <CheckBox elem="Фишка 2, где много текста и необходим перенос"></CheckBox>  
                            <CheckBox elem="Фишка 3"></CheckBox>  
                            <CheckBox elem="Фишка 4, где много текста и необходим перенос"></CheckBox> 
                            <Button buttonName="Присоединиться к обучению" buttonClass="account-btn" onClick={tologin}></Button>
                        </div>
                    </div>
                    <img src={MainPageImg2} alt="Вторая важная картинка"></img>
                </div>
            </div>
            <Footer />
        </div>
      );
}