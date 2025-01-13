import Button from "./Button";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Footer(props) {
    const accessToken = useSelector(state => state.auth.accessToken);
    const role = useSelector(state => state.auth.role);
    const navigate = useNavigate();

    const tologin = () => {
        if (accessToken && role) {
            navigate(role);
        }
        else {
            navigate('/login');
        }
    };

    const uu = () => {
        navigate("/future");
    };

    return(
        <footer className="Footer">
            <Button buttonName = "Преподавателям" buttonClass="footer-btn1" onClick={tologin}/>
            <Button buttonName = "ООО Маркировка и юридическая информация" buttonClass="footer-btn2"/>
            <Button buttonName = "Наши контакты" buttonClass="footer-btn3" onClick={uu}/>
            <Button buttonName = "Ученикам" buttonClass="footer-btn4" onClick={tologin}/>
        </footer>
    )
}