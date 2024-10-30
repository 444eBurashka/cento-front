import {Link} from 'react-router-dom';

import Button from "./Button";
import Input from "./Input";
import { loginData, registerData } from "../data.js";

export default function Form(props) {
    const Data = props.formType === "login" ? loginData : registerData;
    const fields = Object.entries(Data.contentFields);
    const isSubmit = props.formType === "login" ? "hide" : '';

    return(
        <form className={"Form " + props.formType}>
            <h2>{Data.title}</h2>
            <div className="fields-container">
            {
               fields.map(x => <Input textLabel={x[0]} placeholder={x[1]} />)
            }
            </div>
            <div className={"submit-container " + isSubmit}>
                <input id="submit" type="checkbox"></input>
                <label for="scales">Даю согласие на обработку персональных данных в соответствии с <a href="#">пользовательским соглашением</a></label>
            </div>
            <Button buttonName={Data.submitBtnText} buttonClass="account-btn"/>
            <div>
                <p>{Data.addText}</p>
                <Link to={Data.linkAddBtn}>
                    <Button buttonName={Data.addBtnText} />
                </Link>
            </div>
        </form>
    )
}