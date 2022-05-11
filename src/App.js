import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Layout from "./components/layout/layout";
import FileManager from "./components/filemanager/fileManager";
import EmbedRenderer from "./embed/embedRenderer";

function App() {
    return (
        <Routes>
            <Route path="/" element={<FileManager />}></Route>
            <Route path="/embed/*" element={<EmbedRenderer />}></Route>
        </Routes>
    );
}

export default App;
