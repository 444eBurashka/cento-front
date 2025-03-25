import Button from "./Button"
export default function LessonPlan(props) {
    return (
        <div className="LessonPlan">
            <div className="lessonPlane-info">
                <div className="lessonPlane-time">{props.time}</div>
                <div className={"lessonPlane-status "  + props.statusClass}>{props.status}</div>
            </div>
            <div className="lessonPlane-subject">{props.subject}</div>
            <div className="lessonPlane-lessonName">{props.lessonName}</div>
            <Button buttonClass="lessonPlan-btn" buttonName={props.lessonLinkName}></Button>
        </div>  
    )
}