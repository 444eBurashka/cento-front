import subjectIcon from "../img/icon_1.png";
import imgUrl from "../img/subjectTeacher.png"
const divStyle = {
    color: 'blue',
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  };

export default function SectionButton(props) {
    return(
        <div style={divStyle} className="SectionButton">
            <img src={subjectIcon} alt="иконка предмета"></img>
        </div>
    )
}