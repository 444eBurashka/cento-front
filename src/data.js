import inf11 from "../src/resources/taskImages/inf-1-1.png"
import inf12 from "../src/resources/taskImages/inf-1-2.png"
import inf21 from "../src/resources/taskImages/inf-2-1.jpg"
import inf22 from "../src/resources/taskImages/inf-2-2.jpg"
import inf31 from "../src/resources/taskImages/inf-3-1.png"
import inf32 from "../src/resources/taskImages/inf-3-2.png"
import mat11 from "../src/resources/taskImages/mat-1-1.jpg"
import mat12 from "../src/resources/taskImages/mat-1-2.jpg"
import mat21 from "../src/resources/taskImages/mat-2-1.jpg"
import mat31 from "../src/resources/taskImages/mat-3-1.jpg"
import mat32 from "../src/resources/taskImages/mat-3-2.jpg"


const taskpics = {
    "../img/taskImages/inf-1-1.png": inf11,
    "../img/taskImages/inf-1-2.png": inf12,
    "../img/taskImages/inf-2-1.jpg": inf21,
    "../img/taskImages/inf-2-2.jpg": inf22,
    "../img/taskImages/inf-3-1.png": inf31,
    "../img/taskImages/inf-3-2.png": inf32,
    "../img/taskImages/mat-1-1.jpg": mat11,
    "../img/taskImages/mat-1-2.jpg": mat12,
    "../img/taskImages/mat-2-1.jpg": mat21,
    "../img/taskImages/mat-3-1.jpg": mat31,
    "../img/taskImages/mat-3-2.jpg": mat32
};

const loginData = {
    title: "Личный кабинет",
    contentFields: {
        "Логин": "Введите логин",
        "Пароль":"Введите пароль"
    },
    submitBtnText: "Войти в аккаунт",
    addText: "Ещё нет аккаунта?",
    addBtnText: 'Зарегистрироваться',
    linkAddBtn: '/registration',
};

const registerData = {
    title: "Регистрация",
    contentFields: {
        "Логин":"Введите логин",
        "Почта":"Введите вашу почту",
        "Ваша роль": "Выберите вашу роль (Ученик, Учитель)",
        "Пароль": "Введите надежный пароль",
        "Повторите пароль": "Введите надежный пароль"
    },
    submitBtnText: "Зарегистрироваться",
    addText: "Уже есть аккаунт?",
    addBtnText: 'Просто зайдем в него',
    linkAddBtn: '/login',
};

const APIURL = "http://217.114.0.117:8000/api/";

export {loginData, registerData, taskpics, APIURL}