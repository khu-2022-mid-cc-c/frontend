import React from "react";
import FileIcons from "./fileIcon";
import BackImg from "../../share/backImg";
// file list 표시
// props로 넘어온 fileList의 파일들을 display
// 파일 아이콘 클릭시 callback으로 넘어온 selectFile함수 호출

function Files(props) {
    const selected = props.selectedFiles.reduce((acc, cur) => {
        acc[cur.name] = true;
        return acc;
    }, {});

    return (
        <div className="files">
            <BackImg />
            <ul>
                {props.fileList.map((v) => (
                    <li key={v.name} onClick={() => props.selectFile(v)}>
                        <FileIcons
                            title={v.name}
                            type={v.type}
                            selected={selected[v.name]}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Files;
