import "./fileManager.css";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";
import { useState } from "react";

function FileManager() {
    const [value, setValue] = useState("");

    return (
        <div className="fileManager">
            <Controller info={value}/>
            <FileInfo info={value} />
            <Files setValue={setValue} />
        </div>
    );
}

export default FileManager;
