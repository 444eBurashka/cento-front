export default function Calendar(props) {
    const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    var dates = props.dates;
    return (
        <div className="Calendar">
            {days.map((item, index) => (
                <div className="Calendar-item" key={index}>
                    <div>
                        <span className="calendar-time">{dates[index].getDate()}</span>
                        <span className="calendar-day">{item}</span>
                    </div>
                </div>
            ))}
        </div>  
    )
}