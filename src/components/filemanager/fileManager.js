import "./fileManager.css";
import "./apiModal.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Layout from "../layout/layout";
import Modal from "../modal/modal";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";

import MakeFolder from "./api/makeFolder";
import ShareDrive from "./api/shareDrive";
import UploadFile from "./api/uploadFile";
import EmbedFile from "./api/embedFile";
import RenameFile from "./api/renameFile";
import DeleteFile from "./api/deleteFile";

function FileManager(props) {
    // 이후 fetch api call하여 file list를 받아오도록 설계 예정
    //     // const fileList = fetch("url")
    const { driveId } = useParams();
    const URL = `https://linkhu.which.menu/api/drive/file/${driveId}`;

    const [fileList, setFileList] = useState([]);

    const loadFileList = () => {
        // let xhr = new XMLHttpRequest();
        // xhr.timeout = 2000;
        // xhr.withCredentials = true;
        // xhr.onreadystatechange = (e) => {
        //     if(xhr.readyState === xhr.DONE)
        //         if(xhr.status === 200 || xhr.status === 201)
        //             setFileList(JSON.parse(xhr.responseText))
        // }
        // xhr.ontimeout = (e) => {
        //     console.log(e);
        // };
        // xhr.open("GET", URL);
        // xhr.send();
        setTimeout(() => {
            setFileList([
                {
                    key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
                    title: "황지민",
                },
                { key: "fileinfo_3", title: "33" },
                { key: "fileinfo_4", title: "7" },
                { key: "fileinfo_6", title: "김혁중" },
                {
                    key: "fileinfo_5",
                    title: "5.png",
                },
                {
                    key: "fileinfo_2",
                    title: "6.pdf",
                },
                {
                    key: "fileinfo_1",
                    title: "7.mp4",
                },
            ]);
        }, 1000);
    };
    useEffect(() => {
        loadFileList();
    }, []);

    const [sort, setSort] = useState("파일 이름ascend");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalSize, setModalSize] = useState("small");
    const [modalContent, setModalContent] = useState(<></>);

    useEffect(() => {
        const tmp = [...fileList];
        if (sort === "파일 이름ascend") {
            // 문자열 오름차순 정렬
            tmp.sort((a, b) =>
                b.title > a.title ? -1 : a.title > b.title ? 1 : 0
            );
            setFileList(tmp);
        } else if (sort === "파일 이름descend") {
            // 문자열 내림차순 정렬
            tmp.sort((a, b) =>
                b.title < a.title ? -1 : a.title > b.title ? 1 : 0
            );
            setFileList(tmp);
        } else if (sort === "수정 날짜ascend") {
            // 숫자 오름차순
            tmp.sort((a, b) =>
                b.title > a.title ? -1 : a.title > b.title ? 1 : 0
            );
            setFileList(tmp);
        } else if (sort === "수정 날짜descend") {
            // 숫자 내림차순
            tmp.sort((a, b) =>
                b.title > a.title ? -1 : a.title > b.title ? 1 : 0
            );
            setFileList(tmp);
        } else if (sort === "파일 크기ascend") {
            // 숫자 오름차순
            tmp.sort((a, b) =>
                b.title > a.title ? -1 : a.title > b.title ? 1 : 0
            );
            setFileList(tmp);
        } else if (sort === "파일 크기ascend") {
            // 숫자 오름차순
            tmp.sort((a, b) =>
                b.title > a.title ? -1 : a.title > b.title ? 1 : 0
            );
            setFileList(tmp);
        }
    }, [sort]);

    // 특정 파일 아이콘을 클릭시 selectedList에 추가 및 selected를 true로 set
    // 선택된 특정 파일 아이콘을 클릭시 selectedList에서 제거 및 selected를 false로 set
    const selectFile = (v) => {
        if (selectedFiles.find((elem) => elem.key === v.key) === undefined) {
            setSelectedFiles(selectedFiles.concat([v]));
        } else {
            setSelectedFiles(
                [...selectedFiles].filter((cur) => cur.key !== v.key)
            );
        }
    };

    // [n개 선택됨] 버튼 클릭시 selectedFiles를 초기화, fileList의 selected를 모두 false로 set
    const cancel = () => {
        setSelectedFiles([]);
    };

    const setModal = (content, size) => {
        setModalContent(content);
        setModalSize(size);
        setShowModal(true);
    };

    // controller에서 클릭한 버튼에 따라 취할 api call
    const onaction = (action) => {
        switch (action) {
            case "folder":
                setModal(
                    <MakeFolder
                        driveId={driveId}
                        close={() => {
                            setShowModal(false);
                        }}
                    />,
                    "medium"
                );
                break;
            case "upload":
                setModal(
                    <UploadFile
                        driveId={driveId}
                        close={() => {
                            setShowModal(false);
                        }}
                    />,
                    "large"
                );
                break;
            case "share":
                setModal(
                    <ShareDrive
                        driveId={driveId}
                        close={() => {
                            setShowModal(false);
                        }}
                    />,
                    "medium"
                );
                break;
            case "delete":
                setModal(
                    <DeleteFile
                        driveId={driveId}
                        selectedFile={selectedFiles[0]}
                        close={() => {
                            setShowModal(false);
                        }}
                    />,
                    "small"
                );
                break;
            case "move":
                break;
            case "copy":
                break;
            case "rename":
                setModal(
                    <RenameFile
                        driveId={driveId}
                        selectedFile={selectedFiles[0]}
                        close={() => {
                            setShowModal(false);
                        }}
                    />,
                    "medium"
                );
                break;
            case "download":
                break;
            case "embed":
                setModal(
                    <EmbedFile
                        driveId={driveId}
                        selectedFile={selectedFiles[0]}
                        close={() => {
                            setShowModal(false);
                        }}
                    />,
                    "large"
                );
                break;
            default:
                break;
        }
    };

    return (
        <Layout>
            <div className="fileManager">
                <Controller
                    setSort={setSort}
                    selectedFiles={selectedFiles}
                    cancel={cancel}
                    onaction={onaction}
                />
                <FileInfo selectedFiles={selectedFiles} />
                <Files
                    fileList={fileList}
                    selectedFiles={selectedFiles}
                    selectFile={selectFile}
                />
            </div>
            <Modal
                isOpen={showModal}
                close={() => {
                    setShowModal(false);
                }}
                size={modalSize}
            >
                {modalContent}
            </Modal>
        </Layout>
    );
}

export default FileManager;
