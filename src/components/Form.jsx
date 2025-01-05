import {Link} from 'react-router-dom';

import Button from "./Button";
import Input from "./Input";
import { loginData, registerData } from "../data.js";

export default function Form(props) {
    const Data = props.formType === "login" ? loginData : registerData;
    const fields = Object.entries(Data.contentFields);
    const isSubmit = props.formType === "login" ? "hide" : '';

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            "email": e.target[1].value,
            "password": e.target[3].value,
            "role": e.target[2].value,
            "username": e.target[0].value
        };
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          };
        fetch("http://31.129.111.117:8000/api/register/", options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        e.target.reset();
    } 

    return(
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
                <label htmlFor="scales">Даю согласие на обработку персональных данных в соответствии с <a href="t.me/matveykhorev">пользовательским соглашением</a></label>
            </div>
            <Button buttonName={Data.submitBtnText} buttonClass="account-btn" Type="submit"/>
            <div className='addInfo'>
                <p>{Data.addText}</p>
                <Link to={Data.linkAddBtn}>
                    <Button buttonName={Data.addBtnText} buttonClass="regBtn"/>
                </Link>
            </div>
        </form>
    )
}