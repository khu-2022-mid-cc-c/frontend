import "./fileManager.css";
import "./apiModal.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../layout/layout";
import Modal from "../modal/modal";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";
import { getCookies, isCookies } from "../Util";

import downloadFiles from "./api/downloadFile";
import ShareDrive from "./api/shareDrive";
import UploadFile from "./api/uploadFile";
import EmbedFile from "./api/embedFile";
import RenameFile from "./api/renameFile";
import DeleteFile from "./api/deleteFile";
import SetBackground from "./api/setBackground";
import OkModal from "./api/okModal";

const MODALCONTENTS = {
    upload: { ModalComponents: UploadFile, ModalSize: "large" },
    share: { ModalComponents: ShareDrive, ModalSize: "medium" },
    delete: { ModalComponents: DeleteFile, ModalSize: "small" },
    rename: { ModalComponents: RenameFile, ModalSize: "medium" },
    embed: { ModalComponents: EmbedFile, ModalSize: "large" },
    setbg: { ModalComponents: SetBackground, ModalSize: "small" },
};

function FileManager(props) {
    // 이후 fetch api call하여 file list를 받아오도록 설계 예정
    //     // const fileList = fetch("url")
    const { driveId } = useParams();
    const URL = `https://linkhu.which.menu/api/drive/file/${driveId}`;
    const headers = { headers: { Authorization: "Bearer " + getCookies('token') }};

    const [fileList, setFileList] = useState([]);
    const [bgUrl, setBgUrl] = useState("");

    const loadFileList = () => {
        // let xhr = new XMLHttpRequest();
        // xhr.timeout = 2000;
        // xhr.withCredentials = true;
        // xhr.onreadystatechange = (e) => {
        //     if(xhr.readyState === xhr.DONE)
        //         if(xhr.status === 200 || xhr.status === 201)
        //             setFileList(JSON.parse(xhr.responseText).list)
        // }
        // xhr.ontimeout = (e) => {
        //     console.log(e);
        // };
        // xhr.open("GET", URL);
        // xhr.send();
        setTimeout(() => {
            const datareceived = {
                status: true,
                list: [
                    {
                        name: "certificate.png",
                        updated_at: "2021-12-18T17:27:51.458Z",
                        created_at: "2021-12-18T17:27:51.458Z",
                        link: [],
                        type: "Image",
                        creator: {
                            id: "test",
                            nickname: "1234",
                        },
                        download: {
                            url: "https://linkhu-drive-4.s3.ap-northeast-2.amazonaws.com/certificate.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKHZ3I5YS3D56LT%2F20220604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220604T150254Z&X-Amz-Expires=3600&X-Amz-Signature=6e9bc9a9a47f2141433aa5112b47f9c17f29f0e91d61ab49a7208168ad321348&X-Amz-SignedHeaders=host",
                            expires: "2022-06-04T16:02:54.692Z",
                        },
                    },
                    {
                        name: "test.pcap",
                        updated_at: "2022-01-23T13:49:00.000Z",
                        created_at: "2022-01-23T13:49:00.000Z",
                        link: [],
                        type: "Etc",
                        creator: {
                            id: "test",
                            nickname: "1234",
                        },
                        download: {
                            url: "https://linkhu-drive-4.s3.ap-northeast-2.amazonaws.com/test.pcap?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKHZ3I5YS3D56LT%2F20220604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220604T150254Z&X-Amz-Expires=3600&X-Amz-Signature=bc4514b8c1b8dd17d4a762ee5603baa4e3305321fee05149bf00d9b39a89f665&X-Amz-SignedHeaders=host",
                            expires: "2022-06-04T16:02:54.738Z",
                        },
                    },
                    {
                        name: "test_file.png",
                        updated_at: "2022-06-02T19:31:28.857Z",
                        created_at: "2022-06-02T19:31:28.857Z",
                        link: [],
                        type: "Image",
                        creator: {
                            id: "test",
                            nickname: "1234",
                        },
                        download: {
                            url: "https://linkhu-drive-4.s3.ap-northeast-2.amazonaws.com/test_file.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKHZ3I5YS3D56LT%2F20220604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220604T150254Z&X-Amz-Expires=3600&X-Amz-Signature=29a97231cb3ba9795cc53d444144544804fa518da6c5dd1ea041a0db87729548&X-Amz-SignedHeaders=host",
                            expires: "2022-06-04T16:02:54.764Z",
                        },
                    },
                    {
                        name: "test_syn_flood (2).pcap",
                        updated_at: "2022-02-02T16:19:20.000Z",
                        created_at: "2022-02-02T16:19:20.000Z",
                        link: [],
                        type: "Etc",
                        creator: {
                            id: "test",
                            nickname: "1234",
                        },
                        download: {
                            url: "https://linkhu-drive-4.s3.ap-northeast-2.amazonaws.com/test_syn_flood%20%282%29.pcap?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKHZ3I5YS3D56LT%2F20220604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220604T150254Z&X-Amz-Expires=3600&X-Amz-Signature=fa63f68078217519cee5c3a2ebb0c775ac0b5c24c692a618a6234a5951ad4381&X-Amz-SignedHeaders=host",
                            expires: "2022-06-04T16:02:54.796Z",
                        },
                    },
                    {
                        name: "test_syn_flood.pcap",
                        updated_at: "2022-02-02T16:17:33.000Z",
                        created_at: "2022-02-02T16:17:33.000Z",
                        link: [],
                        type: "Etc",
                        creator: {
                            id: "test",
                            nickname: "1234",
                        },
                        download: {
                            url: "https://linkhu-drive-4.s3.ap-northeast-2.amazonaws.com/test_syn_flood.pcap?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKHZ3I5YS3D56LT%2F20220604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220604T150254Z&X-Amz-Expires=3600&X-Amz-Signature=93e375e6e55b8490a936e8f8aca426ff00d9da1d68d7f88dcdf85f8e63675501&X-Amz-SignedHeaders=host",
                            expires: "2022-06-04T16:02:54.820Z",
                        },
                    },
                    {
                        name: "택시무깜.mp4",
                        updated_at: "2022-01-26T04:28:08.645Z",
                        created_at: "2022-01-26T04:28:08.645Z",
                        link: [],
                        type: "Video",
                        creator: {
                            id: "test",
                            nickname: "1234",
                        },
                        download: {
                            url: "https://linkhu-drive-4.s3.ap-northeast-2.amazonaws.com/%ED%83%9D%EC%8B%9C%EB%AC%B4%EA%B9%9C.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKHZ3I5YS3D56LT%2F20220604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220604T150254Z&X-Amz-Expires=3600&X-Amz-Signature=546e18e09ad56b651221881a544b515d091058aa09554e9f87da749b403e3524&X-Amz-SignedHeaders=host",
                            expires: "2022-06-04T16:02:54.864Z",
                        },
                    },
                ],
            };
            setFileList(datareceived.list);
        }, 1000);
    };

    const getFileList = async () => {
        try {
            const response = await axios.get(URL, headers);
            if(response.data.status) {
                setBgUrl(response.data.folder.backgroundImage);
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadFileList();
        getFileList();
    }, [bgUrl]);

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
                b.name > a.name ? -1 : a.name > b.name ? 1 : 0
            );
            setFileList(tmp);
        } else if (sort === "파일 이름descend") {
            // 문자열 내림차순 정렬
            tmp.sort((a, b) =>
                b.name < a.name ? -1 : a.name > b.name ? 1 : 0
            );
            setFileList(tmp);
        } else if (sort === "수정 날짜ascend") {
            // 숫자 오름차순
            tmp.sort((a, b) =>
                Date(b.updated_at) > Date(a.updated_at)
                    ? -1
                    : Date(a.updated_at) > Date(b.updated_at)
                    ? 1
                    : 0
            );
            setFileList(tmp);
        } else if (sort === "수정 날짜descend") {
            // 숫자 내림차순
            tmp.sort((a, b) =>
                Date(b.updated_at) > Date(a.updated_at)
                    ? -1
                    : Date(a.updated_at) > Date(b.updated_at)
                    ? 1
                    : 0
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

    const setModal = (content, size) => {
        setModalContent(content);
        setModalSize(size);
        setShowModal(true);
    };

    const showOkModal = (title, contents) => {
        setModal(
            <OkModal
                title={title}
                contents={contents}
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
                        setBgUrl={setBgUrl}
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
                    bgUrl={bgUrl}
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
