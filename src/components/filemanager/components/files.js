import { IconContext } from "react-icons";
import { AiOutlineFile } from "react-icons/ai";
import React,{ useState } from "react";

function FileIcons(props) {
    return (
        <div>
            <IconContext.Provider value={{ size: "50px", color: "#666666" }}>
                <props.icon />
            </IconContext.Provider>
            <span class="FileTitle">{props.title}</span>
        </div>
    );
}

function Files(props) {
    // const fileInfo = fetch("asdsa").then((res) => res.json());
    const fileInfo = [
        { key: "fileinfo_1", title: "1", icon: AiOutlineFile },
        { key: "fileinfo_2", title: "2", icon: AiOutlineFile },
        { key: "fileinfo_3", title: "3", icon: AiOutlineFile },
        { key: "fileinfo_4", title: "4", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "5", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "6", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "7", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "8", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "9", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "10", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "11", icon: AiOutlineFile },
        { key: "fileinfo_2", title: "12", icon: AiOutlineFile },
        { key: "fileinfo_3", title: "13", icon: AiOutlineFile },
        { key: "fileinfo_4", title: "14", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "15", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "16", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "17", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "18", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "19", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "20", icon: AiOutlineFile },
        { key: "fileinfo_5", title: "21", icon: AiOutlineFile },
    ];

    const [clicks, setClick] = useState([]);

    const onClickHandler = selectedClick => {
        if (clicks.includes(selectedClick)) {
            setClick(clicks.filter(click => click !== selectedClick));
            return;
        }
        setClick([...clicks, selectedClick]);

    };
    props.setValue(clicks);
    console.log(clicks);

    return (
        <div className="files">
            <ul>
                {fileInfo.map((v) => (
                    <li 
                        className={
                            clicks.find(click => click === v.title)
                                ? "FileIcon active"
                                : "FileIcon"
                        }
                        onClick={() => {
                            onClickHandler(v.title);
                            }
                        }
                        key={v.key}
                     >
                        {
                            <FileIcons title={v.title} icon={v.icon} />
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Files;
