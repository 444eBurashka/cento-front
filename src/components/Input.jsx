export default function Input(props) {
    return(
        <div className="Input">
            <label>{props.textLabel}</label>
            <input placeholder={props.placeholder}></input>
        </div>
    )
}