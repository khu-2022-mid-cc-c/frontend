import { useState } from "react";

function MakeFolder(props) {
    const [folderName, setFolderName] = useState("");

    const makeFolder = () => {
        const data = "dirName=" + folderName;

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
        <div className="apiModalContents makeFolderModal">
            <h2>폴더 만들기</h2>
            <input
                placeholder="파일 이름 입력"
                value={folderName}
                onChange={(e) => {
                    setFolderName(e.target.value);
                }}
            />
            <div className="modalBtnZone">
                <button onClick={makeFolder}>생성</button>
            </div>
        </div>
    );
}

export default MakeFolder;
