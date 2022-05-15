import { IconContext } from "react-icons";
import { AiOutlineFile } from "react-icons/ai";

function FileIcons(props) {
    return (
        <div className="FileIcon">
            <IconContext.Provider value={{ size: "50px", color: "#666666" }}>
                <props.icon />
            </IconContext.Provider>
            <span class="FileTitle">{props.title}</span>
        </div>
    );
}

function Files(props){
    const fileInfo = [
        { key: "fileinfo_1", title: "1", icon: AiOutlineFile },
        { key: "fileinfo_2", title: "2", icon: AiOutlineFile },
        { key: "fileinfo_3", title: "3", icon: AiOutlineFile },
        { key: "fileinfo_4", title: "4", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "5", icon: AiOutlineFile },

    ];
    return (
        <div id="files">
            <ul>
                {fileInfo.map((v) => (
                    <li key={v.key}>
                        <FileIcons 
                        title={v.title}
                        icon={v.icon}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Files;