import "./embedViewer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IconContext } from "react-icons";
import { RiShareBoxLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

import ResourceNotFound from "./lib/resourceNotFound";

const fileDownload = require("js-file-download");

function EmbedViewer(props) {
    const { src } = useParams();
    const url = decodeURIComponent(src);
    const { embedData, setEmbedData } = props;
    const [showHeader, setShowHeader] = useState(false);

    const noquery = url.substring(0, url.lastIndexOf("?"));
    const filename = noquery.substring(noquery.lastIndexOf("/") + 1);

    const icons = [
        {
            title: "share",
            icon: RiShareBoxLine,
            onClick: () => {
                <>응애응애</>;
            },
        },
        {
            title: "download",
            icon: MdOutlineFileDownload,
            onClick: () => {
                fileDownload(src, filename);
            },
        },
    ];

    useEffect(() => {
        setEmbedData(url);
        // fetch(url)
        //     .then((res) => {
        //         if (res.status === 404) throw new Error("404");
        //         else return res.blob();
        //     })
        //     .then((img) => {
        //         const localUrl = URL.createObjectURL(img);
        //         setEmbedData(localUrl);
        //     })
        //     .catch((e) => {
        //         setEmbedData("");
        //     });
    }, []);

    if (embedData === false) return <ResourceNotFound />;
    else {
        return (
            <div
                className={props.type !== "pdf" ? "embedViewer" : "pdfViewer"}
                onMouseEnter={() => {
                    setShowHeader(true);
                }}
                onMouseLeave={() => {
                    setShowHeader(false);
                }}
            >
                <div className={`embedHeader ${showHeader ? "show" : "hide"}`}>
                    <span className="fileName">{filename}</span>
                    <div className="embedViewerIconSet">
                        {icons.map((v) => {
                            return (
                                <div
                                    key={v.title}
                                    className="embedViewerIcons"
                                    onClick={v.onClick}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: "30px",
                                            color: "white",
                                        }}
                                    >
                                        <v.icon />
                                    </IconContext.Provider>
                                </div>
                            );
                        })}
                        <div
                            className="embedViewerLogo"
                            onClick={() => {
                                window.open("/", "_blank");
                            }}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt="logo"
                            ></img>
                        </div>
                    </div>
                </div>
                {props.children}
            </div>
        );
    }
}

export default EmbedViewer;
