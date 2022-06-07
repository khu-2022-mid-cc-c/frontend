import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Layout from "../layout/layout";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";
import Modal from "../modal/modal";
import OkModal from "../modal/okModal";
import callAPI from "../lib/callAPI";

import downloadFiles from "./api/downloadFile";
import ShareDrive from "./api/shareDrive";
import ShareFile from "./api/shareFile";
import UploadFile from "./api/uploadFile";
import EmbedFile from "./api/embedFile";
import RenameFile from "./api/renameFile";
import DeleteFile from "./api/deleteFile";
import SetBackground from "./api/setBackground";

import "./fileManager.css";

const MODALCONTENTS = {
    upload: { ModalComponents: UploadFile, ModalSize: "large" },
    share1: { ModalComponents: ShareDrive, ModalSize: "medium" },
    share2: { ModalComponents: ShareFile, ModalSize: "medium" },
    delete: { ModalComponents: DeleteFile, ModalSize: "small" },
    rename: { ModalComponents: RenameFile, ModalSize: "medium" },
    embed: { ModalComponents: EmbedFile, ModalSize: "large" },
    setbg: { ModalComponents: SetBackground, ModalSize: "small" },
};

function FileManager(props) {
    // 이후 fetch api call하여 file list를 받아오도록 설계 예정
    //     // const fileList = fetch("url")
    const { driveId } = useParams();
    const url = `https://linkhu.which.menu/api/drive/file/${driveId}`;

    const [fileList, setFileList] = useState([]);

    const loadFileList = () => {
        callAPI("GET", url, null).then((res) => setFileList(res.list));
        setSelectedFiles([]);
    };
    useEffect(() => {
        loadFileList();
    }, []);

    const [sort, setSort] = useState({ method: "파일 이름", ascend: true });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalSize, setModalSize] = useState("small");
    const [modalContent, setModalContent] = useState(<></>);

    const sortMethod = {
        "파일 이름": "name",
        "수정 날짜": "updated_at",
        "파일 크기": "size",
    };

    useEffect(() => {
        const tmp = [...fileList];

        const comparator = (a, b) => {
            if (a[sortMethod[sort.method]] > b[sortMethod[sort.method]])
                return 1;
            else if (a[sortMethod[sort.method]] < b[sortMethod[sort.method]])
                return -1;
            else return 0;
        };
        tmp.sort(comparator);
        if (sort.ascend) tmp.reverse();
        setFileList(tmp);
    }, [sort]);

    // 특정 파일 아이콘을 클릭시 selectedList에 추가 및 selected를 true로 set
    // 선택된 특정 파일 아이콘을 클릭시 selectedList에서 제거 및 selected를 false로 set
    const selectFile = (v) => {
        if (selectedFiles.find((elem) => elem.name === v.name) === undefined) {
            setSelectedFiles(selectedFiles.concat([v]));
        } else {
            setSelectedFiles(
                [...selectedFiles].filter((cur) => cur.name !== v.name)
            );
        }
    };

    // [n개 선택됨] 버튼 클릭시 selectedFiles를 초기화, fileList의 selected를 모두 false로 set
    const cancel = () => {
        setSelectedFiles([]);
    };

    // controller에서 클릭한 버튼에 따라 띄울 모달
    const setModal = (content, size) => {
        setModalContent(content);
        setModalSize(size);
        setShowModal(true);
    };

    // 모달 확인창
    const showOkModal = (title, contents, next = () => {}) => {
        setModal(
            <OkModal
                title={title}
                contents={contents}
                next={next}
                close={() => setShowModal(false)}
            />,
            "small"
        );
    };

    // controller에서 클릭한 버튼에 따라 취할 api call
    const onaction = (action) => {
        switch (action) {
            case "download":
                downloadFiles(selectedFiles, showOkModal);
                break;
            default:
                const { ModalComponents, ModalSize } = MODALCONTENTS[action];
                setModal(
                    <ModalComponents
                        driveId={driveId}
                        fileList={fileList}
                        selectedFiles={selectedFiles}
                        close={() => {
                            setShowModal(false);
                        }}
                        next={showOkModal}
                        reload={loadFileList}
                    />,
                    ModalSize
                );
        }
    };

    return (
        <Layout>
            <div className="fileManager">
                <Controller
                    sort={sort}
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
