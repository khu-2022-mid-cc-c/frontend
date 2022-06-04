import { useEffect, useState } from "react";
import callAPI from "./callAPI";

const FILETYPE = {
    png: "photo",
    jpg: "photo",
    bmp: "photo",
    mp4: "video",
    avi: "video",
    pdf: "pdf",
};

function EmbedFile(props) {
    const [embedTag, setEmbedTag] = useState("");
    const [embedLink, setEmbedLink] = useState("");

    const selectedFileName = props.selectedFiles[0].name.split(".");
    const selectedFileExt = selectedFileName[selectedFileName.length - 1];
    const embedType = FILETYPE[selectedFileExt];

    const data = "fileId=" + props.selectedFiles[0].name;
    useEffect(() => {
        callAPI(
            "POST",
            `https://linkhu.which.menu//api/drive/manage/${props.driveId}/embed`,
            data
        ).then((v) => setEmbedTag(v));
    });

    if (embedTag === "") {
        return (
            <div className="apiModalContents makeFolderModal">
                <h2>파일 임베드</h2>
            </div>
        );
    } else {
        return (
            <div className="apiModalContents embeddingModal">
                <h2>파일 임베드</h2>
                <iframe
                    id="embedModalFrame"
                    onLoad={(e) => {
                        setEmbedLink(e.target.src);
                    }}
                    src={`/embed/${embedType}/${embedTag}`}
                    title="modalEmbeddedFile"
                    width="800px"
                    height="600px"
                ></iframe>
                <div className="embedModalBtns">
                    <input disabled value={embedLink} />
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `<iframe
                            src={${embedLink}}
                            width="800px"
                            height="600px"
                            ></iframe>`
                            );
                        }}
                    >
                        복사
                    </button>
                </div>
            </div>
        );
    }
}

export default EmbedFile;
