import "./fileManager.css";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";
import Files from "./components/files";

function FileManager() {
    return (
        <div id="fileManager">
            <Controller />
            <FileInfo />
            <Files />
        </div>
    );
}

export default FileManager;
