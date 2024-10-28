import Button from "./Button";

export default function Footer(props) {
    return(
        <footer className="Footer">
            <Button buttonName = "Преподавателям" buttonClass="footer-btn1"/>
            <Button buttonName = "ООО маркировка кароч, если нужна" buttonClass="footer-btn2"/>
            <Button buttonName = "Наши контакты" buttonClass="footer-btn3"/>
            <Button buttonName = "Ученикам" buttonClass="footer-btn4"/>
        </footer>
    )
}