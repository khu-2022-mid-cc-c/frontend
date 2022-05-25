import React from "react";

// selectedFiles들의 정보 표시함

function fileInfo(props) {
    return (
        <div id="fileInfo">
            <p>{props.selectedFiles}</p>
        </div>
    );
}

export default fileInfo;
