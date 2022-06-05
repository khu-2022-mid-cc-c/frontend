import EmbedViewer from "./embedViewer";
import { useState } from "react";

function PDFViewer() {
    const [embedData, setEmbedData] = useState("");

    return (
        <EmbedViewer
            embedData={embedData}
            setEmbedData={setEmbedData}
            type="pdf"
        >
            <embed
                src={embedData}
                className="embedPdf"
                width="100%"
                type="application/pdf"
            />
        </EmbedViewer>
    );
}

export default PDFViewer;
