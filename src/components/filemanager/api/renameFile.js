import { useState } from "react";
import callAPI from "../../lib/callAPI";

function RenameFile(props) {
    const [fileName, setFileName] = useState("");

    const renameFile = () => {
        if (fileName === "") {
            props.next("파일 이름 변경 실패", <>파일의 이름을 입력해주세요.</>);
            return;
        }

        if (props.fileList.find((elem) => elem.name === fileName)) {
            props.next(
                "파일 이름 변경 실패",
                <>중복되는 이름의 파일이 존재합니다. 다시 시도해주세요.</>
            );
            return;
        }

        const data =
            "key=" +
            props.selectedFiles[0].name +
            "&newKey=" +
            encodeURI(fileName);

        // console.log(data);
        callAPI(
            "POST",
            `https://linkhu.which.menu//api/drive/file/${props.driveId}/move_file`,
            data
        )
            .then((v) => {
                props.reload();
                props.next(
                    "파일 이름 변경 성공",
                    <>
                        파일 <strong>{props.selectedFiles[0].name}</strong>이
                        성공적으로 <strong>{fileName}</strong>으로
                        변경되었습니다.
                    </>
                );
            })
            .catch(() => {
                props.reload();
                props.next(
                    "파일 이름 변경 실패",
                    <>
                        파일 <strong>{props.selectedFiles[0].name}</strong>을{" "}
                        <strong>{fileName}</strong>으로 변경하지 못했습니다.
                    </>
                );
            });
    };

    return (
        <div className="apiModalContents makeFolderModal">
            <h2>파일 이름 변경</h2>
            <input
                placeholder="파일 이름 입력"
                value={fileName}
                onChange={(e) => {
                    setFileName(e.target.value);
                }}
            />
            <div className="modalBtnZone">
                <button onClick={renameFile}>변경</button>
            </div>
        </div>
    );
}

export default RenameFile;
