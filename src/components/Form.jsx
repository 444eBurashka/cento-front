import { Link, useNavigate } from 'react-router-dom';
import Button from "./Button";
import Input from "./Input";
import { loginData, registerData } from "../data.js";
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTokens, clearTokens } from '../store/store.js';

const Popup = (props) => {
    return (
        <div className={'alert-popup ' + props.popupClass}>{props.text}</div>
    );
};
  
const insertElementAtEnd = (text, type) => {
    const newElement = document.createElement('div');
    document.body.appendChild(newElement);
    ReactDOM.render(<Popup popupClass={type} text={text}/>, newElement);
    newElement.addEventListener('animationend', () => {
        newElement.remove();
      });
};

export default function Form(props) {
    const Data = props.formType === "login" ? loginData : registerData;
    const fields = Object.entries(Data.contentFields);
    const isSubmit = props.formType === "login" ? "hide" : '';
    const navigate = useNavigate(); // Хук для переадресации

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        if (props.formType === 'login') {
            const tokenUrl = "http://31.129.111.117:8000/api/token/";
            const formdata = {
                "username": e.target[0].value,
                "password": e.target[1].value,
            };

            fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata)
            })
                .then(response => response.json())
                .then(tokens => {
                    console.log('Tokens:', tokens);
                    if (tokens.detail === "No active account found with the given credentials") {
                        // alert("Неправильный логин или пароль");
                        insertElementAtEnd("Неправильный логин или пароль", "incorrect");
                    }
                    if (tokens.role === "ученик") {
                        const dct = {
                            access: tokens.access,
                            refresh: tokens.refresh,
                            role: '/accountStudent'
                        }
                        dispatch(setTokens(dct));
                        navigate('/accountStudent');
                    } else if (tokens.role === "учитель") {
                        const dct = {
                            access: tokens.access,
                            refresh: tokens.refresh,
                            role: '/accountTeacher'
                        }
                        dispatch(setTokens(dct));
                        navigate('/accountTeacher'); 
                    }
                })
                .catch(error => {
                    alert("Неправильный логин или пароль", "incorrect");
                });
        }
        else {
            const formdata = {
                "username": e.target[0].value,
                "email": e.target[1].value,
                "role": e.target[2].value,
                "password1": e.target[3].value,
                "password2": e.target[4].value,
                "r": e.target[5].checked
            };
    
            if (formdata["password1"] === formdata["password2"] && formdata["r"] && (formdata["role"] === "Ученик" || formdata["role"] === "Учитель")) {
                const reqdata = {
                    "username": formdata["username"],
                    "email": formdata["email"],
                    "password": formdata["password1"],
                    "phone_number": "343",
                    "studying_year": 11,
                    "tariff_id": 1
                };
    
                const registerUrl = formdata["role"] === "Ученик"
                    ? "http://31.129.111.117:8000/api/register/student/"
                    : "http://31.129.111.117:8000/api/register/teacher/";
    
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqdata)
                };
    
                fetch(registerUrl, options)
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Student registered successfully' || data.message === 'Teacher registered successfully') {
                            const tokenUrl = "http://31.129.111.117:8000/api/token/";
                            const tokenData = {
                                username: formdata.username,
                                password: formdata.password1
                            };
    
                            fetch(tokenUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(tokenData)
                            })
                                .then(response => response.json())
                                .then(tokens => {
                                    if (formdata.role === "Учитель") {
                                        const dct = {
                                            access: tokens.access,
                                            refresh: tokens.refresh,
                                            role: '/accountTeacher'
                                        }
                                        dispatch(setTokens(dct));
                                        navigate('/accountTeacher');
                                    } else if (formdata.role === "Ученик") {
                                        const dct = {
                                            access: tokens.access,
                                            refresh: tokens.refresh,
                                            role: '/accountStudent'
                                        }
                                        dispatch(setTokens(dct));
                                        navigate('/accountStudent'); 
                                    }
                                })
                                .catch(error => console.error(error));
                        }
                        else {
                            if (data.email) {
                                // alert("Проверьте правильность ввода email");
                                insertElementAtEnd("Проверьте правильность ввода email", "incorrect");
                            }
                            else if (data.username) {
                                // alert("Проверьте правильность ввода логина");
                                insertElementAtEnd("Проверьте правильность ввода логина", "incorrect");
                            }
                            else {
                                // alert("Проверьте правильность введенных данных");
                                insertElementAtEnd("Проверьте правильность введенных данных", "incorrect");
                            }
                        }
                    })
                    .catch(error => console.error(error.json()));
    
                // e.target.reset();
            } else {
                if (!formdata["username"] || !formdata["email"]) {
                    // alert("Поля не могут быть пустыми");
                    insertElementAtEnd("Поля не могут быть пустыми", "incorrect");
                }
                else if (!(formdata["password1"] === formdata["password2"])) {
                    // alert("Пароли не совпадают");
                    insertElementAtEnd("Пароли не совпадают", "incorrect");
                }
                else if (!(formdata["role"] === "Ученик" || formdata["role"] === "Учитель")) {
                    // alert("Неправильная роль");
                    insertElementAtEnd("Неправильная роль", "incorrect");
                }
                else if (!formdata["r"]) {
                    // alert("Нужно дать согласие");
                    insertElementAtEnd("Нужно дать согласие", "incorrect");
                }
                else {
                    // alert("Что-то пошло не так");
                    insertElementAtEnd("Что-то пошло не так", "incorrect");
                }
            }
        }

        
    }

    return (
        <form className={"Form " + props.formType} key={props.formType} onSubmit={handleSubmit}>
            <h2>{Data.title}</h2>
            <div className="fields-container">
                {
                    fields.map(x =>
                        <Input
                            key={props.formType + x[0]}
                            textLabel={x[0]}
                            placeholder={x[1]}
                        />)
                }
            </div>
            <div className={"submit-container " + isSubmit}>
                <input id="submit" type="checkbox"></input>
                <label htmlFor="scales">Даю согласие на обработку персональных данных в соответствии с <a target="_blank" href="/future">пользовательским соглашением</a></label>
            </div>
            <Button buttonName={Data.submitBtnText} buttonClass="account-btn" Type="submit" />
            <div className='addInfo'>
                <p>{Data.addText}</p>
                <Link to={Data.linkAddBtn}>
                    <Button buttonName={Data.addBtnText} buttonClass="regBtn" />
                </Link>
            </div>
        </form>
    );
}