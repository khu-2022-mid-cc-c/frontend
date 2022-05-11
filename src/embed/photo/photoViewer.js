import "./photoViewer.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import resolvePath from "../lib/resourcePathResolve";
import ResourceNotFound from "../lib/resourceNotFound";

import { IconContext } from "react-icons";
import { RiShareBoxLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import { logDOM } from "@testing-library/react";

function PhotophotoViewer() {
    const { src } = useParams();
    const resolvedSrc = resolvePath(src);
    const [imageData, setImageData] = useState("");
    useEffect(() => {
        fetch(resolvedSrc)
            .then((res) => {
                if (res.status === 404) throw new Error("404");
                else return res.blob();
            })
            .then((img) => {
                const localUrl = URL.createObjectURL(img);
                setImageData(localUrl);
            })
            .catch((e) => {
                setImageData(false);
            });
    }, []);

    const [showHeader, setShowHeader] = useState(false);
    const icons = [
        { title: "share", icon: RiShareBoxLine, href: "/about" },
        { title: "download", icon: MdOutlineFileDownload, href: "/about" },
    ];

    if (imageData === false) return <ResourceNotFound />;
    else {
        return (
            <div
                className="photoViewer"
                onMouseEnter={() => {
                    setShowHeader(true);
                }}
                onMouseLeave={() => {
                    setShowHeader(false);
                }}
            >
                <div
                    className={`photoHeader ${
                        showHeader ? "photoHeader-show" : "photoHeader-hide"
                    }`}
                >
                    <span className="fileName">ㅁㄴㅇㄹ.jpg</span>
                    <div className="photoViewerIconSet">
                        {icons.map((v) => {
                            return (
                                <a href={v.href} title={v.title}>
                                    <div className="photoViewerIcons">
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
                        <div className="photoViewerLogo">
                            <img
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt="logo"
                            ></img>
                        </div>
                    </div>
                </div>
                <img className="photo" src={imageData} alt=""></img>
            </div>
        );
    }
}

export default PhotophotoViewer;
