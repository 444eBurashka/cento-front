export default function Select(props) {
    const data = props.answers;
    return (
        <select className={"Select " + props.selectClass}>
            <option selected disabled>{props.text}</option>
            {Object.entries(data).map(([key, value]) => <option value={key}>{value}</option>)}
        </select>
    )
}