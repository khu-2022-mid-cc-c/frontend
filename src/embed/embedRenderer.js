import { Route, Routes } from "react-router-dom";

import PhotoViewer from "./photoViewer";
import VideoViewer from "./videoViewer";
import PDFViewer from "./pdfViewer";

function EmbedRenderer() {
    return (
        <Routes>
            <Route path="/photo/:src" element={<PhotoViewer />}></Route>
            <Route path="/video/:src" element={<VideoViewer />}></Route>
            <Route path="/pdf/:src" element={<PDFViewer />}></Route>
        </Routes>
    );
}

export default EmbedRenderer;
