const loginData = {
    title: "Личный кабинет",
    contentFields: {
        "Логин":"Введите почту или номер телефона",
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
        "Имя Фамилия":"Введите ваше имя и фамилиюа",
        "Почта":"Введите вашу почту",
        "Ваша роль": "Выберите вашу роль",
        "Пароль": "Введите надежный пароль",
        "Повторите пароль": "Введите надежный пароль"
    },
    submitBtnText: "Зарегистрироваться",
    addText: "Уже есть аккаунт?",
    addBtnText: 'Просто зайдем в него',
    linkAddBtn: '/login',
};

export {loginData, registerData}