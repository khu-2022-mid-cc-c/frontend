import callAPI from "./callAPI";

function DeleteFile(props) {
    const deleteFile = () => {
        const data = "fileId=" + props.selectedFiles[0].name;
        callAPI(
            "DELETE",
            `https://linkhu.which.menu//api/drive/manage/${props.driveId}`,
            data
        )
            .then((v) => {
                props.reload();
                props.next(
                    "파일 삭제 성공",
                    <>
                        파일 <strong>{props.selectedFiles[0].name}</strong>을
                        삭제하였습니다.
                    </>
                );
            })
            .catch(() => {
                props.reload();
                props.next(
                    "파일 삭제 실패",
                    <>
                        파일 <strong>{props.selectedFiles[0].name}</strong>을
                        삭제하지 못하였습니다.
                    </>
                );
            });
    };

    return (
        <div className="apiModalContents deleteFileModal">
            <h2>파일 삭제</h2>
            <div className="apiModalText">
                파일 <strong>{props.selectedFiles[0].name}</strong>
                {props.selectedFiles.length > 1
                    ? ` 및 ${props.selectedFiles.length - 1}개의 파일`
                    : ""}
                을 삭제합니까?
            </div>
            <div className="modalBtnZone">
                <button onClick={props.close}>취소</button>
                <button onClick={deleteFile}>삭제</button>
            </div>
        </div>
    );
}

export default DeleteFile;
