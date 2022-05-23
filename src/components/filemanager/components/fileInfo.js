import React from "react";

function fileInfo(props) {
    return (
        <div id="fileInfo">
            <p>{props.selectedFiles}</p>
        </div>
    );
}

export default fileInfo;
