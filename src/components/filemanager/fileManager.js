import "./fileManager.css";
import Layout from "../layout/layout";
import Controller from "./components/controller";
import FileInfo from "./components/fileInfo";

function FileManager() {
    return (
        <Layout>
            <div id="fileManager">
                <Controller />
                <FileInfo />
            </div>
        </Layout>
    );
}

export default FileManager;
