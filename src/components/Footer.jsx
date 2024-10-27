import Button from "./Button";

export default function Footer(props) {
    return(
        <footer className="Footer">
            <Button buttonName="Преподавателям"/>
            <Button buttonName = "ООО маркировка кароч, если нужна"/>
            <Button buttonName = "Наши контакты"/>
            <Button buttonName = "Ученикам"/>
        </footer>
    )
}