import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { ImEmbed2 } from "react-icons/im";
import { IoMdShareAlt } from "react-icons/io";
import {
    MdClose,
    MdDeleteOutline,
    MdDriveFileRenameOutline,
    MdSort,
    MdOutlineFileDownload,
    MdOutlineFileUpload,
    MdImage,
} from "react-icons/md";

const controlBtns = [
    [
        { key: "upload", title: "업로드", icon: MdOutlineFileUpload },
        { key: "share", title: "공유", icon: IoMdShareAlt },
    ],
    [
        {
            key: "rename",
            title: "이름 바꾸기",
            icon: MdDriveFileRenameOutline,
        },
        { key: "delete", title: "삭제", icon: MdDeleteOutline },
        { key: "download", title: "다운로드", icon: MdOutlineFileDownload },
        { key: "embed", title: "임베드", icon: ImEmbed2 },
        { key: "setbg", title: "배경 설정", icon: MdImage },
    ],
    [
        { key: "delete", title: "삭제", icon: MdDeleteOutline },
        { key: "download", title: "다운로드", icon: MdOutlineFileDownload },
    ],
];

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
    const [kindsort, setKindSort] = useState("");
    const [sortname, setSortName] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        props.setClickSort(sort);
    }, [sort]);

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
                                setSortName(v);
                                setSort(v + kindsort);
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
                    setKindSort("ascend");
                    setSort(sortname + "ascend");
                }}
            >
                오름차순
            </div>
            <div
                className={`sortingMethod ${props.asc ? "" : "now"}`}
                onClick={() => {
                    props.onset(props.method, false);
                    setKindSort("descend");
                    setSort(sortname + "descend");
                }}
            >
                내림차순
            </div>
        </div>
    );
}

function Controller(props) {
    let { selectedFiles } = props;
    let displayMode = selectedFiles.length < 2 ? selectedFiles.length : 2;

    let [showSortingFrame, setShowSortingFrame] = useState(false);
    let [sortMethod, setSortMethod] = useState("파일 이름");
    let [ascOrder, setAscOrder] = useState(true);
    let [clickSort, setClickSort] = useState("");

    useEffect(() => {
        props.setSort(clickSort);
    }, [clickSort]);

    return (
        <div className="controller">
            <ul>
                {controlBtns[displayMode].map((v) => (
                    <li
                        key={v.key}
                        onClick={() => {
                            props.onaction(v.key);
                        }}
                    >
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
                            title={`${selectedFiles.length}개 선택됨`}
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
