import Button from "../components/Button";

export default function FinanceLessonCard(props) {
    return (
        <div className="FinanceLessonCard">
            <div className="fin-date-time">
                <p>{props.Date}</p>
                <p>{props.Time}</p>
            </div>
            <p>{props.subject}</p>
            <p className="fin-theme">{props.theme}</p>
            <p className="fin-student">{props.student}</p>
            <Button buttonName='оплатить' buttonClass='account-btn'></Button>
        </div>
      );
}