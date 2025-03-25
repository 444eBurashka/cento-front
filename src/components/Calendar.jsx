export default function Calendar(props) {
    const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    var firstDate = Number(props.firstDate);
    return (
        <div className="Calendar">
            {days.map((item, index) => (
                <div className="Calendar-item" key={index}>
                    <div>
                        <span className="calendar-time">{firstDate+index}</span>
                        <span className="calendar-day">{item}</span>
                    </div>
                </div>
            ))}
        </div>  
    )
}