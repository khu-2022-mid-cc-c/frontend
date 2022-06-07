import React, { useState, useRef } from "react";
import { getCookies } from "../../Util";

/**
 * AWS 파일 업로더
 * @param {JSX.Element} [props.uploadBox] 업로드 박스 (JSX 엘리먼트)
 * @param {(fileName: string, percent: number) => void} [props.OnUploadStatusChanged] 업로드 퍼센테이지가 변경되었을 때 호출되는 함수
 * @param {(fileName: string) => void} [props.OnUploadDone] 업로드가 완료되었을 때 호출되는 함수
 * @param {(fileName: string, error: string) => void} [props.OnUploadFail] 업로드가 실패하였을 때 호출되는 함수
 * @returns {JSX.Element}
 * @constructor
 */
const Uploader = (props) => {
    let uploadBox = props.uploadBox;
    if (uploadBox === undefined) {
        uploadBox = <div>Drop file here or click here to upload file</div>;
    }

    const RequestFileUpload = async (file, callback = (percent) => {}) => {
        const token = getCookies("token");

        const request = await fetch(props.uploadURL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                key: file.name,
                modified: file.lastModifiedDate.toISOString(),
                created: new Date(),
            }),
        });
        const json = await request.json();
        if (json.status === false) {
            return false;
        }

        const uploadRequest = new XMLHttpRequest();
        uploadRequest.open("PUT", json.url);

        uploadRequest.upload.addEventListener("progress", function (e) {
            const percent_completed = (e.loaded / e.total) * 100;
            callback(percent_completed);
        });

        uploadRequest.addEventListener("load", function () {
            if (uploadRequest.status === 200) {
                callback(true);
            } else {
                callback(
                    uploadRequest.responseXML.querySelector("Error Message")
                        .innerHTML
                );
            }
        });

        uploadRequest.send(file);
        callback(0);
    };

    const UploadFile = async (event, element = null) => {
        const input = element ?? event.target;
        const files = input.files;

        if (files.length < 1) {
            return;
        }

        for (const file of files) {
            await RequestFileUpload(file, (data) => {
                if (typeof data === "string") {
                    if (props.OnUploadFail !== undefined)
                        props.OnUploadFail(file.name, data);
                } else if (data === true) {
                    if (props.OnUploadDone !== undefined)
                        props.OnUploadDone(file.name);
                } else {
                    if (props.OnUploadStatusChanged !== undefined)
                        props.OnUploadStatusChanged(file.name, data);
                }
            });
        }
    };

    const InputFile = React.forwardRef((props, ref) => {
        return <input type={"file"} ref={ref} onChange={UploadFile} />;
    });

    const fileInput = useRef(null);

    const OnFileDrop = (event) => {
        event.preventDefault();

        fileInput.current.files = event.dataTransfer.files;
        UploadFile(null, fileInput.current).then();
    };

    const OpenFileSelector = () => {
        fileInput.current.click();
    };

    return (
        <div
            className={"apiModalContents FileUploader"}
            onDragOver={(e) => e.preventDefault()}
            onDrop={OnFileDrop}
            onClick={OpenFileSelector}
        >
            <InputFile ref={fileInput} />
            {uploadBox}
        </div>
    );
};

function UploadProgress(props) {
    return (
        <div className="apiModalContents uploadFileModal">
            <h2>파일 업로드</h2>
            {props.files.map((file) => (
                <div className="uploadState" key={file.fileName}>
                    <strong>{file.fileName}</strong>{" "}
                    {file.progress !== true ? (
                        <progress max="100" value={file.progress}>
                            {props.progress}%
                        </progress>
                    ) : file.progress === true ? (
                        <span className="success">업로드 완료</span>
                    ) : file.error !== false ? (
                        <span className="failed">업로드 실패</span>
                    ) : (
                        ""
                    )}
                </div>
            ))}
        </div>
    );
}

function UploadFile(props) {
    const [mouseOver, setMouseOver] = useState(false);
    const [fileUploadProgress, setFileUploadProgress] = useState([]);

    const dropHandler = (e) => {
        e.preventDefault();
        setMouseOver(false);
    };

    const dragOverHandler = (e) => {
        e.preventDefault();
        setMouseOver(true);
    };

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setMouseOver(false);
    };

    return fileUploadProgress.length < 1 ? (
        <Uploader
            uploadURL={`https://linkhu.which.menu//api/drive/file/${props.driveId}`}
            uploadBox={
                <div
                    className="uploadFileModal"
                    onDrop={dropHandler}
                    onDragOver={dragOverHandler}
                    onDragLeave={dragLeaveHandler}
                >
                    <h2>파일 업로드</h2>
                    <div
                        className={`fileDropZone ${
                            mouseOver ? "mouseOver" : ""
                        }`}
                    >
                        여기에 파일(들)을 드래그해주세요
                    </div>
                </div>
            }
            OnUploadStatusChanged={(fileName, progress) => {
                const currentFileUploadProgress = fileUploadProgress;
                const currentFile = currentFileUploadProgress.findIndex(
                    (p) => p.fileName === fileName
                );
                if (currentFile === -1) {
                    currentFileUploadProgress.push({
                        fileName,
                        progress,
                        error: false,
                    });
                } else {
                    currentFileUploadProgress[currentFile].progress = progress;
                }

                setFileUploadProgress([...currentFileUploadProgress]);
            }}
            OnUploadDone={(fileName) => {
                const currentFileUploadProgress = fileUploadProgress;
                const currentFile = currentFileUploadProgress.findIndex(
                    (p) => p.fileName === fileName
                );
                if (currentFile === -1) {
                    currentFileUploadProgress.push({
                        fileName,
                        progress: true,
                        error: false,
                    });
                } else {
                    currentFileUploadProgress[currentFile].progress = true;
                }

                setFileUploadProgress([...currentFileUploadProgress]);
                props.reload();
            }}
            OnUploadFail={(fileName, message) => {
                const currentFileUploadProgress = fileUploadProgress;
                const currentFile = currentFileUploadProgress.findIndex(
                    (p) => p.fileName === fileName
                );
                if (currentFile === -1) {
                    currentFileUploadProgress.push({
                        fileName,
                        progress: 0,
                        error: message,
                    });
                } else {
                    currentFileUploadProgress[currentFile].error = message;
                }

                setFileUploadProgress([...currentFileUploadProgress]);
                props.reload();
            }}
        />
    ) : (
        <UploadProgress files={fileUploadProgress} />
    );
}

export default UploadFile;
