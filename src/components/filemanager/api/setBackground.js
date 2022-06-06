import callAPI from "./callAPI";
import axios from "axios";
import { getCookies, isCookies } from "../../Util";

function SetBackground(props) {

    // const setBackground = async () => {
    //     try {
    //         const response = await axios.post(`https://linkhu.which.menu//api/drive/file/${props.driveId}/background_image`, 
    //             { key: props.selectedFiles[0].name },
    //             {headers: {
    //                 Authorization: "Bearer " + getCookies('token'),
    //             }}
    //             );
    //         console.log(response.data)

    //     } catch(err) {
    //         props.reload();
    //         props.next(
    //             "배경 설정 실패",
    //             <>사용자 에게 드라이브를 공유하지 못했습니다.</>
    //         );
    //     } 
    // }
    const setBackground = () => {
        const data = "fileName=" + props.selectedFiles[0].name;
        callAPI(
            "POST",
            `https://linkhu.which.menu//api/drive/file/${props.driveId}/background_image`,
            data
        )
            .then((v) => {
                const data = JSON.parse(v);
                props.setBgUrl(data.folder.backgroundImage);
                props.reload();
                props.next(
                    "배경 설정 성공",
                    <>사용자 에게 드라이브가 공유되었습니다.</>
                );
            })
            .catch((v) => {
                props.reload();
                props.next(
                    "배경 설정 실패",
                    <>사용자 에게 드라이브를 공유하지 못했습니다.</>
                );
            });
    };

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
