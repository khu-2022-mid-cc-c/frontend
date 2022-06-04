import "./fileManager.css";
import Layout from "../layout/layout";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";
import { useState } from "react";

function FileManager() {
    // 이후 fetch api call하여 file list를 받아오도록 설계 예정

    const url = "";

    // const { fileList, dirList } = fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         data.list.map((v) => {
    //             v;
    //         });
    //     });

    const fileList = [
        { key: "fileinfo_5", title: "5", selected: useState(false) },
        { key: "fileinfo_2", title: "6", selected: useState(false) },
        { key: "fileinfo_1", title: "7", selected: useState(false) },
    ];
    const [selectedFiles, setSelectedFiles] = useState([]);

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

    return (
        <Layout>
            <div className="fileManager">
                <Controller selectedFiles={selectedFiles} cancel={cancel} />
                <FileInfo selectedFiles={selectedFiles} />
                <Files
                    fileList={fileList}
                    selectedFiles={selectedFiles}
                    selectFile={selectFile}
                />
            </div>
        </Layout>
    );
}

export default FileManager;
