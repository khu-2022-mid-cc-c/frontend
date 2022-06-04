import { useState } from "react";
import callAPI from "../lib/callAPI";

function NewDrive(props) {
    const [driveName, setDriveName] = useState("");

    const newDrive = () => {
        const data = "name=" + driveName;

        if (driveName === "") {
            props.next(
                "드라이브 생성 실패",
                <>드라이브 이름을 입력해주세요.</>
            );
            return;
        }

        callAPI(
            "POST",
            "https://linkhu.which.menu//api/drive/manage/create",
            data
        )
            .then(() => {
                props.reload();
                props.next(
                    "드라이브 생성 성공",
                    <>
                        새로운 드라이브 <strong>{driveName}</strong>를
                        생성하였습니다.
                    </>
                );
            })
            .catch(() => {
                props.reload();
                props.next(
                    "드라이브 생성 실패",
                    <>
                        드라이브 <strong>{driveName}</strong>를 생성하지
                        못했습니다.
                    </>
                );
            });
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
