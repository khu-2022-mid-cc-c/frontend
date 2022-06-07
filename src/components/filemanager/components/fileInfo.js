import React from "react";
// selectedFiles들의 정보 표시함

function fileInfo(props) {
    var moment = require("moment");

    return (
        <div className="fileInfos">
            {props.selectedFiles.map((v) => {
                const time = moment(v.created_at).format(
                    "YYYY년 MM월 DD일  HH시 mm분 ss초"
                );
                return (
                    <p key={v.name} className="fileInfo">
                        {v.type === "Image" ? (
                            <img alt="" src={v.download.url}></img>
                        ) : (
                            ""
                        )}

                        <div className="fileInfoText">파일 이름 : {v.name}</div>
                        <div className="fileInfoText">업로드 날짜 : {time}</div>
                        <div className="fileInfoText">파일 형식 : {v.type}</div>
                        <div className="fileInfoText">
                            닉네임 : {v.creator.nickname}
                        </div>
                    </p>
                );
            })}
        </div>
    );
}

export default fileInfo;
