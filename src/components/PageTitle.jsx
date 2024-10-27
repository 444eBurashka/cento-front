export default function PageTitle(props) {
    return(
        <h1 className="PageTitle">
            {props.pageName}<i className="PageTitle-italic">{props.pageNameItalic}</i>
        </h1>  
    )
}