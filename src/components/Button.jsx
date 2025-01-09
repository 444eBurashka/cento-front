export default function Button(props) {
    const btnType = props.Type === "submit" ? "submit" : "button"
    return(
        <button type={btnType} className={"Button " + props.buttonClass} onClick={props.onClick}>{props.buttonName}</button>
    )
}