import { useState } from "react";

function ShareDrive(props) {
    const [user, setUser] = useState("");

    const share = () => {
        const data = "id=" + user;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.readystatechange = (e) => {
            if (xhr.readyState === xhr.DONE)
                if (xhr.status === 200 || xhr.status === 201); // do something
        };

        xhr.open(
            "POST",
            `https://linkhu.which.menu/api/drive/manage/${props.driveId}/share`
        );

        xhr.send(data);
    };

    return (
        <div className="apiModalContents makeFolderModal">
            <h2>드라이브 공유</h2>
            <input
                placeholder="공유할 유저 id 입력"
                value={user}
                onChange={(e) => {
                    setUser(e.target.value);
                }}
            />
            <div className="modalBtnZone">
                <button onClick={share}>공유</button>
            </div>
        </div>
    );
}

export default ShareDrive;
