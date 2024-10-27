export default function Button(props) {
    return(
        <button className={"Button " + props.buttonClass}>{props.buttonName}</button>
    )
}