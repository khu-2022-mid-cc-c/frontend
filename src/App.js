import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Layout from "./components/layout/layout";
import FileManager from "./components/filemanager/fileManager";
import EmbedRenderer from "./embed/embedRenderer";

function App() {
    return (
        <>
            <Routes>
                <Route path="/embed/*" element={<EmbedRenderer />}></Route>
                <Route path="/:driveId" element={<FileManager />}></Route>
            </Routes>
        </>
    );
}

export default App;
