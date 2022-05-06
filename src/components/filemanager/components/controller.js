import { IconContext } from "react-icons";
import { IoMdShareAlt } from "react-icons/io";
import {
    MdDeleteOutline,
    MdDriveFileMoveOutline,
    MdFileCopy,
    MdDriveFileRenameOutline,
    MdSort,
} from "react-icons/md";

function ControllerItems(props) {
    return (
        <div className="controllerItem">
            <IconContext.Provider value={{ size: "24px", color: "#666666" }}>
                <props.icon />
            </IconContext.Provider>
            <span>{props.title}</span>
        </div>
    );
}

function Controller(props) {
    const controlBtns = [
        { key: "share", title: "공유", icon: IoMdShareAlt },
        { key: "delete", title: "삭제", icon: MdDeleteOutline },
        { key: "move", title: "이동", icon: MdDriveFileMoveOutline },
        { key: "copy", title: "복사", icon: MdFileCopy },
        { key: "rename", title: "이름 바꾸기", icon: MdDriveFileRenameOutline },
    ];

    return (
        <div id="controller">
            <ul>
                {controlBtns.map((v) => (
                    <li key={v.key}>
                        <ControllerItems title={v.title} icon={v.icon} />
                    </li>
                ))}
            </ul>
            <div id="sort">
                <ControllerItems title={"정렬"} icon={MdSort} />
            </div>
        </div>
    );
}

export default Controller;
