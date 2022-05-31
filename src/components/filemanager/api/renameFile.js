import { useState } from "react";

function RenameFile(props) {
    const [fileName, setFileName] = useState("");

    const renameFile = () => {
        const data = "dirName=" + fileName;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.readystatechange = (e) => {
            if (xhr.readyState === xhr.DONE)
                if (xhr.status === 200 || xhr.status === 201); // do something
        };

        xhr.open(
            "POST",
            `https://linkhu.which.menu/api/drive/manage/${props.driveId}/rename`
        );

        xhr.send(data);
    };

    return (
        <div className="apiModalContents makeFolderModal">
            <h2>파일 이름 변경</h2>
            <input
                placeholder="파일 이름 입력"
                value={fileName}
                onChange={(e) => {
                    setFileName(e.target.value);
                }}
            />
            <div className="modalBtnZone">
                <button onClick={renameFile}>변경</button>
            </div>
        </div>
    );
}

export default RenameFile;
