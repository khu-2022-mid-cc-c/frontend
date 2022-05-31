import "./fileManager.css";
import Layout from "../layout/layout";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";
import { useState } from "react";

function FileManager() {
    // 이후 fetch api call하여 file list를 받아오도록 설계 예정
    // const fileList = fetch("url")
    const fileList = [
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", title: "황지민", selected: useState(false) },
        { key: "fileinfo_2", title: "2", selected: useState(false) },
        { key: "fileinfo_1", title: "정진웅", selected: useState(false) },
        { key: "fileinfo_3", title: "33", selected: useState(false) },
        { key: "fileinfo_4", title: "7", selected: useState(false) },
        { key: "fileinfo_6", title: "김혁중", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttes", title: "황지민", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttet", title: "황지민", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttettesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttst", title: "황지민", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestest", title: "황지민", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestest", title: "황지민", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttettest", title: "황지민", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttsttest", title: "황지민", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttsttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestesttest", title: "황지민", selected: useState(false) },
        { key: "testtesttesttesttesttesttesttesttesttesttesttesttestesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestesttest", title: "황지민", selected: useState(false) },
        
    ];

    const [sort, setSort] = useState("ascend");
    const [selectedFiles, setSelectedFiles] = useState([]);

    console.log(sort);

    if( sort === "파일 이름ascend" ) fileList.sort((a, b) => b.title > a.title ? -1 : a.title > b.title ? 1 : 0); // 문자열 오름차순 정렬
    else if(sort === "파일 이름descend") fileList.sort((a, b) => b.title < a.title ? -1 : a.title > b.title ? 1 : 0); // 문자열 내림차순 정렬
    else if(sort === "수정 날짜ascend") fileList.sort((a, b) => a.title - b.title); // 숫자 오름차순
    else if(sort === "수정 날짜descend") fileList.sort((a, b) => b.title - a.title); // 숫자 내림차순
    else if(sort === "파일 크기ascend") fileList.sort((a, b) => a.title - b.title); // 숫자 오름차순
    else if(sort === "파일 크기ascend") fileList.sort((a, b) => a.title - b.title); // 숫자 오름차순

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
                <Controller 
                    setSort={setSort}
                    selectedFiles={selectedFiles} cancel={cancel}
                />
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
