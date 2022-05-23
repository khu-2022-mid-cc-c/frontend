import "./fileManager.css";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";
import { useState } from "react";

function FileManager() {
    const fileList = [
        { key: "fileinfo_5", title: "5", selected: useState(false) },
        { key: "fileinfo_2", title: "6", selected: useState(false) },
        { key: "fileinfo_1", title: "7", selected: useState(false) },
    ];
    const [selectedFiles, setSelectedFiles] = useState([]);

    const selectFile = (v) => {
        if (!v.selected[0]) {
            setSelectedFiles(selectedFiles.concat([v.key]));
        } else {
            setSelectedFiles([...selectedFiles].filter((cur) => cur !== v.key));
        }
        v.selected[1](!v.selected[0]);
    };

    const cancel = () => {
        fileList.forEach((v) => v.selected[1](false));
        setSelectedFiles([]);
    };

    return (
        <div className="fileManager">
            <Controller selectedFiles={selectedFiles} cancel={cancel} />
            <FileInfo selectedFiles={selectedFiles} />
            <Files
                fileList={fileList}
                selectedFiles={selectedFiles}
                selectFile={selectFile}
            />
        </div>
    );
}

export default FileManager;
