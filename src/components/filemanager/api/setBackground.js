import axios from "axios";
import { getCookies } from "../../Util";

function SetBackground(props) {
    const setBackground = async () => {
        try {
            const response = await axios.post(
                `https://linkhu.which.menu//api/drive/file/${props.driveId}/background_image`,
                { key: props.selectedFiles[0].name },
                {
                    headers: {
                        Authorization: "Bearer " + getCookies("token"),
                    },
                }
            );
            if (response.data.status) {
                props.setBgName(props.selectedFiles[0].name);
                props.reload();
                props.next(
                    "배경 설정 성공",
                    <>
                        파일 <strong>{props.selectedFiles[0].name}</strong>을
                        배경으로 설정하였습니다.
                    </>
                );
            } else {
                props.reload();
                props.next(
                    "배경 설정 실패",
                    <>
                        파일 <strong>{props.selectedFiles[0].name}</strong>을
                        배경으로 설정하지 못하였습니다.
                    </>
                );
            }
            console.log(response.data);
        } catch (err) {
            props.reload();
            props.next(
                "배경 설정 실패",
                <>사용자 에게 드라이브를 공유하지 못했습니다.</>
            );
        }
    };
    // const setBackground = () => {
    //     const data = "key=" + props.selectedFiles[0].name;
    //     callAPI(
    //         "POST",
    //         `https://linkhu.which.menu//api/drive/file/${props.driveId}/background_image`,
    //         data
    //     )
    //         .then((v) => {
    //             props.setBgName(props.selectedFiles[0].name);
    //             props.reload();
    //             props.next(
    //                 "배경 설정 성공",
    //                 <>사용자 에게 드라이브가 공유되었습니다.</>
    //             );
    //         })
    //         .catch((v) => {
    //             props.reload();
    //             props.next(
    //                 "배경 설정 실패",
    //                 <>사용자 에게 드라이브를 공유하지 못했습니다.</>
    //             );
    //         });
    // };

    return (
        <div className="apiModalContents deleteFileModal">
            <h2>배경 설정</h2>
            <div className="apiModalText">
                파일 <strong>{props.selectedFiles[0].name}</strong>을 배경으로
                설정합니까?
            </div>
            <div className="modalBtnZone">
                <button onClick={props.close}>취소</button>
                <button onClick={setBackground}>설정</button>
            </div>
        </div>
    );
}

export default SetBackground;
