import callAPI from "../../lib/callAPI";

function SetBackground(props) {
    const setBackground = () => {
        const data = "key=" + props.selectedFiles[0].name;
        callAPI(
            "POST",
            `https://linkhu.which.menu//api/drive/file/${props.driveId}/background_image`,
            data
        )
            .then((v) => {
                props.reload();
                props.next(
                    "배경 설정 성공",
                    <>
                        파일 <strong>{props.selectedFiles[0].name}</strong>을
                        배경으로 설정하였습니다.
                    </>
                );
            })
            .catch(() => {
                props.reload();
                props.next(
                    "배경 설정 실패",
                    <>
                        파일 <strong>{props.selectedFiles[0].name}</strong>을
                        배경으로 설정하지 못하였습니다.
                    </>
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
