import { useState } from "react";

function DeleteFile(props) {
    const deleteFile = () => {
        const data = "fileId=" + props.selectedFile.Id;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.readystatechange = (e) => {
            if (xhr.readyState === xhr.DONE)
                if (xhr.status === 200 || xhr.status === 201); // do something
        };

        xhr.open(
            "POST",
            `https://linkhu.which.menu/api/drive/manage/${props.driveId}/dir`
        );

        xhr.send(data);
    };

    return (
        <div className="apiModalContents deleteFileModal">
            <h2>파일 삭제</h2>
            <div className="apiModalText">
                파일 {props.selectedFile.title}을 삭제합니까?
            </div>
            <div className="modalBtnZone">
                <button onClick={props.close}>취소</button>
                <button onClick={deleteFile}>삭제</button>
            </div>
        </div>
    );
}

export default DeleteFile;
