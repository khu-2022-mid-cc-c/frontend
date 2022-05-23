import "./fileManager.css";
import Layout from "../layout/layout";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";
import { useState } from "react";

function FileManager() {
    const [value, setValue] = useState("");

    return (
        <div id="fileManager">
            <Controller />
            <FileInfo info = {value}/>
            <Files setValue={setValue}/>
        </div>
    );
}

export default FileManager;