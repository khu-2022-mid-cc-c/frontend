import { useState } from "react";
import callAPI from "../../lib/callAPI";

function ShareDrive(props) {
    const [user, setUser] = useState("");

    const share = () => {
        const data = "id=" + user;

        callAPI(
            "POST",
            `https://linkhu.which.menu//api/drive/manage/${props.driveId}/share`,
            data
        )
            .then((v) => {
                props.reload();
                props.next(
                    "드라이브 공유 성공",
                    <>
                        사용자 <strong>{user}</strong>에게 파일{" "}
                        <strong>{props.selectedFiles[0].name}</strong>가
                        공유되었습니다.
                    </>
                );
            })
            .catch(() => {
                props.reload();
                props.next(
                    "드라이브 공유 실패",
                    <>
                        사용자 <strong>{user}</strong>에게 파일{" "}
                        <strong>{props.selectedFiles[0].name}</strong>를
                        공유하지 못했습니다.
                    </>
                );
            });
    };

    return (
        <div className="apiModalContents makeFolderModal">
            <h2>파일 공유</h2>
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
