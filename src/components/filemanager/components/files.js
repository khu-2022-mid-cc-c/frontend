import React from "react";
import FileIcons from "./fileIcon";
import { useState } from "react";

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
