import "./fileManager.css";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";

function FileManager() {
    return (
        <div id="fileManager">
            <Controller />
            <FileInfo />
        </div>
    );
}

export default FileManager;
