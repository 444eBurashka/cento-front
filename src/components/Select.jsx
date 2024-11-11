const data = {
    "math":'Математика', 
    "info":"Информатика", 
    "rus":"Русский язык"};

export default function Select(props) {
    props = data;
    return (
        <select className="Select">
            <option selected disabled>Поиск по разделам</option>
            {Object.entries(props).map(([key, value]) => <option value={key}>{value}</option>)}
        </select>
    )
}