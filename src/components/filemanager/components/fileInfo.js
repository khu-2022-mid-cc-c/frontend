import React from "react";

// selectedFiles들의 정보 표시함

function fileInfo(props) {
    return (
        <div className="fileInfos">
            {props.selectedFiles.map((v) => {
                return (
                    <p key={v.name} className="fileInfo">
                        {v.name}
                    </p>
                );
            })}
        </div>
    );
}

export default fileInfo;
