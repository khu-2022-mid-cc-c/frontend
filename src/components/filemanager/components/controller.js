import { useState } from "react";
import { IconContext } from "react-icons";
import { ImEmbed2 } from "react-icons/im";
import { IoMdShareAlt } from "react-icons/io";
import {
    MdClose,
    MdDeleteOutline,
    MdDriveFileMoveOutline,
    MdFileCopy,
    MdDriveFileRenameOutline,
    MdSort,
    MdOutlineFileDownload,
    MdOutlineFileUpload,
    MdOutlineCreateNewFolder,
} from "react-icons/md";

function ControllerItems(props) {
    return (
        <div className="controllerItem">
            <IconContext.Provider value={{ size: "24px", color: "#666666" }}>
                <props.icon />
            </IconContext.Provider>
            <span>{props.title}</span>
        </div>
    );
}

function Sorts(props) {
    const methods = ["파일 이름", "수정 날짜", "파일 크기"];
    const [sort, setSort] = useState("");

    props.setClickSort(sort);

    return (
        <div className={`sortingFrame ${props.show}`}>
            <div className="sortingMethods">
                {methods.map((v) => {
                    return (
                        <div
                            className={`sortingMethod ${
                                props.method === v ? "now" : ""
                            }`}
                            onClick={() => {
                                props.onset(v, props.asc);
                            }}
                            key={v}
                        >
                            {v}
                        </div>
                    );
                })}
            </div>
            <div
                className={`sortingMethod ${props.asc ? "now" : ""}`}
                onClick={() => {
                        props.onset(props.method, true);
                        setSort(sort === "ascend" ? "ascend" : "ascend");
                    }
                }
            >
                오름차순
            </div>
            <div
                className={`sortingMethod ${props.asc ? "" : "now"}`}
                onClick={() => {
                        props.onset(props.method, false);
                        setSort(sort === "descend" ? "descend" : "descend");
                    }
                }
            >
                내림차순
            </div>
        </div>
    );
}

function Controller(props) {
    let { selectedFiles } = props;
    let displayMode = selectedFiles.length < 2 ? selectedFiles.length : 2;

    let command = () => {};
    const controlBtns = [
        [
            {
                key: "folder",
                title: "폴더 만들기",
                icon: MdOutlineCreateNewFolder,
            },
            { key: "upload", title: "업로드", icon: MdOutlineFileUpload },
        ],
        [
            { key: "share", title: "공유", icon: IoMdShareAlt },
            { key: "delete", title: "삭제", icon: MdDeleteOutline },
            { key: "move", title: "이동", icon: MdDriveFileMoveOutline },
            { key: "copy", title: "복사", icon: MdFileCopy },
            {
                key: "rename",
                title: "이름 바꾸기",
                icon: MdDriveFileRenameOutline,
            },
            { key: "download", title: "다운로드", icon: MdOutlineFileDownload },
            { key: "upload", title: "업로드", icon: MdOutlineFileUpload },
            { key: "embed", title: "임베드", icon: ImEmbed2 },
        ],
        [
            { key: "delete", title: "삭제", icon: MdDeleteOutline },
            { key: "move", title: "이동", icon: MdDriveFileMoveOutline },
            { key: "copy", title: "복사", icon: MdFileCopy },
            { key: "download", title: "다운로드", icon: MdOutlineFileDownload },
        ],
    ];

    let [showSortingFrame, setShowSortingFrame] = useState(false);
    let [sortMethod, setSortMethod] = useState("파일 이름");
    let [ascOrder, setAscOrder] = useState(true);
    let [clickSort, setClickSort] = useState("");

    props.setSort(clickSort);

    return (
        <div className="controller">
            <ul>
                {controlBtns[displayMode].map((v) => (
                    <li key={v.key} onClick={command(v.title)}>
                        <ControllerItems title={v.title} icon={v.icon} />
                    </li>
                ))}
            </ul>
            <div className="leftControllerGroup">
                {displayMode > 0 && (
                    <div
                        className="cancel"
                        onClick={() => {
                            props.cancel();
                        }}
                    >
                        <ControllerItems
                            title={`${displayMode}개 선택됨`}
                            icon={MdClose}
                        />
                    </div>
                )}
                <div
                    className="sort"
                    onClick={() => {
                        setShowSortingFrame(!showSortingFrame);
                    }}
                >
                    <ControllerItems title={"정렬"} icon={MdSort} />
                </div>
            </div>
            <Sorts
                show={showSortingFrame ? "" : "hide"}
                method={sortMethod}
                asc={ascOrder}
                setClickSort={setClickSort}
                onset={(method, asc) => {
                    setSortMethod(method);
                    setAscOrder(asc);
                }}
            />
        </div>
    );
}

export default Controller;
