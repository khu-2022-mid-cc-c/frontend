import "./pdfViewer.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import resolvePath from "./lib/resourcePathResolve3";
import ResourceNotFound from "./lib/resourceNotFound";

import { IconContext } from "react-icons";
import { RiShareBoxLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

function PDFViewer() {
    const { src } = useParams();
    const resolvedSrc = resolvePath(src);
    const [pdfData, setPDFData] = useState("");
    useEffect(() => {
        fetch(resolvedSrc)
            .then((res) => {
                if (res.status === 404) throw new Error("404");
                else return res.blob();
            })
            .then((img) => {
                const localUrl = URL.createObjectURL(img);
                setPDFData(localUrl);
            })
            .catch((e) => {
                console.log(e);
                setPDFData(false);
            });
    }, []);

    const icons = [
        { title: "share", icon: RiShareBoxLine, href: "/about" },
        { title: "download", icon: MdOutlineFileDownload, href: "/about" },
    ];

    if (pdfData === false) return <ResourceNotFound />;
    else {
        return (
            <div className="pdfViewer">
                <div className="pdfHeader">
                    <span className="fileName">ㅁㄴㅇㄹ.pdf</span>
                    <div className="pdfViewerIconSet">
                        {icons.map((v) => {
                            return (
                                <a href={v.href} title={v.title} key={v.title}>
                                    <div className="pdfViewerIcons">
                                        <IconContext.Provider
                                            value={{
                                                size: "30px",
                                                color: "white",
                                            }}
                                        >
                                            <v.icon />
                                        </IconContext.Provider>
                                    </div>
                                </a>
                            );
                        })}
                        <div className="pdfViewerLogo">
                            <img
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt="logo"
                            ></img>
                        </div>
                    </div>
                </div>
                <embed
                    src={resolvedSrc}
                    className="pdf"
                    width="100%"
                    type="application/pdf"
                />
            </div>
        );
    }
}

export default PDFViewer;
