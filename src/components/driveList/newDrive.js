import { useState } from "react";

function NewDrive(props) {
    const [driveName, setDriveName] = useState("");

    const newDrive = () => {
        const data = "name=" + driveName;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.readystatechange = (e) => {
            if (xhr.readyState === xhr.DONE)
                if (xhr.status === 200 || xhr.status === 201); // do something
        };

        xhr.open("POST", `https://linkhu.which.menu/api/drive/manage/create`);

        xhr.send(data);
    };

    return (
        <div className="apiModalContents makeFolderModal">
            <h2>드라이브 생성</h2>
            <input
                placeholder="드라이브 이름 입력"
                value={driveName}
                onChange={(e) => {
                    setDriveName(e.target.value);
                }}
            />
            <div className="modalBtnZone">
                <button onClick={newDrive}>생성</button>
            </div>
        </div>
    );
}

export default NewDrive;
