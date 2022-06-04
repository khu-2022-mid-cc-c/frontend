import React from "react";
import FileIcons from "./fileIcon";

// file list 표시
// props로 넘어온 fileList의 파일들을 display
// 파일 아이콘 클릭시 callback으로 넘어온 selectFile함수 호출

function Files(props) {
    return (
        <div className="files">
            <ul>
                {props.fileList.map((v) => (
                    <div onClick={() => props.selectFile(v)} key={v.key}>
                        <li key={v.key}>
                            <FileIcons
                                title={v.title}
                                icon={v.icon}
                                selected={v.selected[0]}
                            />
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Files;
