import "./App.css";
// import { useState } from "react";
import Layout from "./components/layout/layout";
import FileManager from "./components/filemanager/fileManager";

function App() {
    return (
        <Layout>
            <FileManager />
        </Layout>
    );
}

export default App;
