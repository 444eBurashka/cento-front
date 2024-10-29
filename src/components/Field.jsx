export default function Field(props) {
    return(
        <div className="Field">
            <label>{props.fieldLabel}</label>
            <p>{props.fieldText}</p>
        </div>
    )
}