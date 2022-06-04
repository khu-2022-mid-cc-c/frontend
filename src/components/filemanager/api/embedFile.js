import { useState } from "react";

const FILETYPE = {
    png: "photo",
    jpg: "photo",
    bmp: "photo",
    mp4: "video",
    avi: "video",
    pdf: "pdf",
};

function EmbedFile(props) {
    const [embedLink, setEmbedLink] = useState("");

    const selectedFile = props.selectedFiles[0];
    const selectedFileName = selectedFile.name.split(".");
    const selectedFileExt = selectedFileName[selectedFileName.length - 1];
    const embedType = FILETYPE[selectedFileExt];

    const embedSrc = selectedFile.download.url;

    return (
        <div className="apiModalContents embeddingModal">
            <h2>파일 임베드</h2>
            <div className="embedContent">
                <iframe
                    id="embedModalFrame"
                    onLoad={(e) => {
                        setEmbedLink(e.target.src);
                    }}
                    src={`/embed/${embedType}/${encodeURIComponent(embedSrc)}`}
                    title="modalEmbeddedFile"
                    width="800px"
                    height="450px"
                ></iframe>
            </div>
            <div className="embedModalBtns">
                <input
                    disabled
                    value={`<iframe src="${encodeURIComponent(
                        embedLink
                    )}" width="800px" height="600px"></iframe>`}
                />
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `<iframe src="${encodeURIComponent(
                                embedLink
                            )}" width="800px" height="600px"></iframe>`
                        );
                    }}
                >
                    복사
                </button>
            </div>
        </div>
    );
}

export default EmbedFile;
