import { IconContext } from "react-icons";
import { AiOutlineFile } from "react-icons/ai";
import { IoMdMusicalNotes } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOndemandVideo, MdPhotoCameraBack } from "react-icons/md";

// fileIcon은 분리하였음
// 선택 여부에 따라 selected class가 추가되어, 선택되었음을 표시
// 디렉토리 아이콘의 경우 더블클릭하면 해당 path로 이동하는 기능 구현 필요

function FileIcons(props) {
    const iconType = {
        Etc: AiOutlineFile,
        Video: MdOndemandVideo,
        Document: IoDocumentTextOutline,
        Audio: IoMdMusicalNotes,
        Image: () => (
            <div className="imgFileIcon">
                <img src={props.file.download.url} alt="imgFileIcon"></img>
            </div>
        ),
    };

    const Icon = iconType[props.file.type];

    return (
        <div className={`FileIcon ${props.selected ? "selected" : ""}`}>
            <IconContext.Provider value={{ size: "50px", color: "#666666" }}>
                <Icon />
            </IconContext.Provider>
            <span className="FileTitle">{props.file.name}</span>
        </div>
    );
}

export default FileIcons;
