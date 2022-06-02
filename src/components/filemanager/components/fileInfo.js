import React from "react";

// selectedFiles들의 정보 표시함

function fileInfo(props) {
    return (
        <div id="fileInfos">
            {props.selectedFiles.map((v) => {
                return <p id="fileInfo">{v.key}</p>;
            })}
        </div>
    );
}

export default fileInfo;
