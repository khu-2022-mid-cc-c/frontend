import { IconContext } from "react-icons";
import { AiOutlineFile } from "react-icons/ai";

function FileIcons(props) {
    return (
        <div className={`FileIcon ${props.selected ? "selected" : ""}`}>
            <IconContext.Provider value={{ size: "50px", color: "#666666" }}>
                <AiOutlineFile />
            </IconContext.Provider>
            <span className="FileTitle">{props.title}</span>
        </div>
    );
}

export default FileIcons;
