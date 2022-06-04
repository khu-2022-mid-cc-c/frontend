import "./embedViewer.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ResourceNotFound from "./lib/resourceNotFound";

import { IconContext } from "react-icons";
import { RiShareBoxLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

function VideoViewer() {
    const { src } = useParams();
    const url = decodeURIComponent(src);
    const [videoData, setVideoData] = useState("");

    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (res.status === 404) throw new Error("404");
                else return res.blob();
            })
            .then((img) => {
                const localUrl = URL.createObjectURL(img);
                setVideoData(localUrl);
            })
            .catch((e) => {
                console.log(e);
                setVideoData(false);
            });
    }, []);

    const [showHeader, setShowHeader] = useState(false);
    const icons = [
        { title: "share", icon: RiShareBoxLine, href: "/about" },
        { title: "download", icon: MdOutlineFileDownload, href: "/about" },
    ];

    if (videoData === false) return <ResourceNotFound />;
    else {
        return (
            <div
                className="embedViewer"
                onMouseEnter={() => {
                    setShowHeader(true);
                }}
                onMouseLeave={() => {
                    setShowHeader(false);
                }}
            >
                <div
                    className={`embedHeader ${
                        showHeader ? "embedHeader-show" : "embedHeader-hide"
                    }`}
                >
                    <span className="fileName">ㅁㄴㅇㄹ.mp4</span>
                    <div className="embedViewerIconSet">
                        {icons.map((v) => {
                            return (
                                <a href={v.href} title={v.title} key={v.title}>
                                    <div className="embedViewerIcons">
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
                        <div className="embedViewerLogo">
                            <img
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt="logo"
                            ></img>
                        </div>
                    </div>
                </div>
                <video controls width="100%" height="100%">
                    <source src={videoData} />
                </video>
            </div>
        );
    }
}

export default VideoViewer;
