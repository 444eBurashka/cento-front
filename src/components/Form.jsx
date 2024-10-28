import Button from "./Button";
import Input from "./Input";
import { loginData, registerData } from "../data.js";

export default function Form(props) {
    const Data = props.formtype === "login" ? loginData : registerData;
    const fields = Object.entries(Data.contentFields);
    return(
        <form className="Form">
            <h2>{Data.title}</h2>
            {
               fields.map(x => <Input textLabel={x[0]} placeholder={x[1]} />)
            }
            <Button buttonName={Data.submitBtnText} buttonClass="account-btn"/>
            <div>
                <p>{Data.addText}</p>
                <Button buttonName={Data.addBtnText}></Button>
            </div>
        </form>
    )
}