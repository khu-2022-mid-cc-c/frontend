import React, { useState, useEffect } from "react";

import FileIcons from "./fileIcon";
import imgUrl from "../../../assets/img/default_bg.jpg";
// file list 표시
// props로 넘어온 fileList의 파일들을 display
// 파일 아이콘 클릭시 callback으로 넘어온 selectFile함수 호출

function Files(props) {

    const selected = props.selectedFiles.reduce((acc, cur) => {
        acc[cur.name] = true;
        return acc;
    }, {});

    return (
        <div className="files" style={ props.bgUrl !== "" ? {backgroundImage: `url(${props.bgUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'} : null}>
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
