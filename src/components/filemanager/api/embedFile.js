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
    const [embedTag, setEmbedTag] = useState("");
    const [embedLink, setEmbedLink] = useState("");

    const selectedFileName = props.selectedFile.title.split(".");
    const selectedFileExt = selectedFileName[selectedFileName.length - 1];
    const embedType = FILETYPE[selectedFileExt];

    const embedFile = () => {
        // const xhr = new XMLHttpRequest();
        // const data = "fileId=" + props.selectedFile.Id;
        // xhr.withCredentials = true;

        // xhr.readystatechange = (e) => {
        //     if (xhr.readyState === xhr.DONE)
        //         if (xhr.status === 200 || xhr.status === 201)
        //             setEmbedTag(JSON.parse(xhr.responseText));
        // };

        // xhr.open(
        //     "POST",
        //     `https://linkhu.which.menu/api/drive/manage/${props.driveId}/embed`
        // );

        // xhr.send(data);
        setTimeout(() => {
            setEmbedTag("asd");
        }, 1000);
    };
    embedFile();

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
                            onLoad={(e) => {
                                setEmbedLink(e.target.src);
                            }}
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
