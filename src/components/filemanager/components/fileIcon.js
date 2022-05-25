import { IconContext } from "react-icons";
import { AiOutlineFile } from "react-icons/ai";

// fileIcon은 분리하였음
// 선택 여부에 따라 selected class가 추가되어, 선택되었음을 표시
// 디렉토리 아이콘의 경우 더블클릭하면 해당 path로 이동하는 기능 구현 필요

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
