import { Route, Routes } from "react-router-dom";

import PhotoViewer from "./photoViewer";
import VideoViewer from "./videoViewer";
import PDFViewer from "./pdfViewer";

function Index() {
    return (
        <>
            <h3>/photo</h3>
            <iframe
                title="photoEmbed"
                src="http://localhost:3000/embed/photo/photo-1652159689167-1f1bf55a6abe"
                width="800px"
                height="600px"
            ></iframe>
            <br />
            <h3>/video</h3>
            <iframe
                title="videoEmbed"
                src="http://localhost:3000/embed/video/asdsa"
                width="800px"
                height="600px"
            ></iframe>
            <h3>/pdf</h3>
            <iframe
                title="pdfEmbed"
                src="http://localhost:3000/embed/pdf/asdsa"
                width="800px"
                height="600px"
            ></iframe>
        </>
    );
}

function FileManager() {
    return (
        <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/photo/:src" element={<PhotoViewer />}></Route>
            <Route path="/video/:src" element={<VideoViewer />}></Route>
            <Route path="/pdf/:src" element={<PDFViewer />}></Route>
        </Routes>
    );
}

export default FileManager;
