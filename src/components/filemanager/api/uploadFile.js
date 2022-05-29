import { useState } from "react";

function UploadFile(props) {
    const [mouseOver, setMouseOver] = useState(false);

    const filePicker = async (a) => {
        const [fileStream] = await window.showOpenFilePicker();
        const file = await fileStream.getFile();
        console.log(file);
    };

    const dropHandler = (e) => {
        e.preventDefault();
        setMouseOver(false);

        let files = e.dataTransfer.items;
        console.log(files);
        if (!files) return;

        for (let i = 0; i < files.length; i++) {
            console.log(files[i].getAsFile());
        }
    };

    function dragOverHandler(e) {
        e.preventDefault();
        setMouseOver(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        setMouseOver(false);
    }

    return (
        <div
            className="uploadFileModal"
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
        >
            <h2>파일 업로드</h2>
            <div
                className={`fileDropZone ${mouseOver ? "mouseOver" : ""}`}
                onClick={filePicker}
            >
                여기에 파일(들)을 드래그해주세요
            </div>
        </div>
    );
}

export default UploadFile;
