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
                props.next(
                    "드라이브 공유 성공",
                    <>
                        사용자 <strong>{user}</strong>에게 드라이브가
                        공유되었습니다.
                    </>
                );
            })
            .catch(() => {
                props.next(
                    "드라이브 공유 실패",
                    <>
                        사용자 <strong>{user}</strong>에게 드라이브를 공유하지
                        못했습니다.
                    </>
                );
                // props.next(
                //     "드라이브 공유 성공",
                //     <>
                //         사용자 <strong>{user}</strong>에게 드라이브가
                //         공유되었습니다.
                //     </>
                // );
            });
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
                <button onClick={share} style={{ borderRadius: "3px" }}>
                    공유
                </button>
            </div>
        </div>
    );
}

export default ShareDrive;
