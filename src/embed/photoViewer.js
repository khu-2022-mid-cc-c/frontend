import EmbedViewer from "./embedViewer";
import { useState } from "react";

function PhotoViewer() {
    const [embedData, setEmbedData] = useState("");

    return (
        <EmbedViewer
            embedData={embedData}
            setEmbedData={setEmbedData}
            type="image"
        >
            <img src={embedData} className="embedPhoto" alt=""></img>
        </EmbedViewer>
    );
}

export default PhotoViewer;
