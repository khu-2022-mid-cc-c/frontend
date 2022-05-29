import "./fileManager.css";
import "./apiModal.css";
import { useState } from "react";
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

import resolveDrivePath from "./lib/urlPathResolve";

function FileManager(props) {
    // 이후 fetch api call하여 file list를 받아오도록 설계 예정
    const { driveId } = useParams();
    const url = resolveDrivePath(driveId);
    // const fileList = fetch(url).then((res) => res.json()).then(() => {});
    const fileList = [
        { key: "fileinfo_5", title: "5", selected: useState(false) },
        { key: "fileinfo_2", title: "6", selected: useState(false) },
        { key: "fileinfo_1", title: "7", selected: useState(false) },
    ];
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalSize, setModalSize] = useState("small");
    const [modalContent, setModalContent] = useState(<></>);

    // 특정 파일 아이콘을 클릭시 selectedList에 추가 및 selected를 true로 set
    // 선택된 특정 파일 아이콘을 클릭시 selectedList에서 제거 및 selected를 false로 set
    const selectFile = (v) => {
        if (!v.selected[0]) {
            setSelectedFiles(selectedFiles.concat([v]));
        } else {
            setSelectedFiles(
                [...selectedFiles].filter((cur) => cur.key !== v.key)
            );
        }
        v.selected[1](!v.selected[0]);
    };

    // [n개 선택됨] 버튼 클릭시 selectedFiles를 초기화, fileList의 selected를 모두 false로 set
    const cancel = () => {
        fileList.forEach((v) => v.selected[1](false));
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
                setModal(<MakeFolder />, "small");
                break;
            case "upload":
                setModal(<UploadFile />, "large");
                break;
            case "share":
                setModal(<ShareDrive />, "medium");
                break;
            case "delete":
                break;
            case "move":
                break;
            case "copy":
                break;
            case "rename":
                break;
            case "download":
                break;
            case "embed":
                setModal(<EmbedFile />, "large");
                break;
            default:
                break;
        }
    };

    return (
        <Layout>
            <div className="fileManager">
                <Controller
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
