import React from "react";

// selectedFiles들의 정보 표시함

function fileInfo(props) {
    return (
        <div id="fileInfo">
            {props.selectedFiles.map((v) => {
                return <>{v.key}</>;
            })}
            선택됨
        </div>
    );
}

export default fileInfo;
