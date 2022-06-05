import EmbedViewer from "./embedViewer";
import { useState } from "react";

function VideoViewer() {
    const [embedData, setEmbedData] = useState("");

    return (
        <EmbedViewer
            embedData={embedData}
            setEmbedData={setEmbedData}
            type="video"
        >
            <video width="100%" height="100%" controls key={embedData}>
                <source src={embedData} type="video/mp4" />
            </video>
            {/* <video controls autoplay width="100%" height="100%">
                <source src={embedData} type="video/mp4" />
            </video> */}
        </EmbedViewer>
    );
}

export default VideoViewer;
