import { FaShareAlt } from "react-icons/fa";
import {
    MdOutlineDriveFolderUpload,
    MdOutlineWatchLater,
} from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { IconContext } from "react-icons";

function SideBarItems(props) {
    return (
        <li>
            <div>
                <div>
                    <IconContext.Provider
                        value={{ size: "24px", color: "#666666" }}
                    >
                        <props.item.icon />
                    </IconContext.Provider>
                </div>
                <CSSTransition
                    in={props.show}
                    timeout={200}
                    classNames={"fade"}
                    unmountOnExit
                >
                    <span>{props.item.title}</span>
                </CSSTransition>
            </div>
        </li>
    );
}

function SideBar(props) {
    let className = props.show ? "sideBar" : "sideBar hide";

    const menuItems = [
        {
            key: "drive",
            title: "드라이브",
            icon: MdOutlineDriveFolderUpload,
            href: "/cry1",
        },
        {
            key: "recent",
            title: "최근 파일",
            icon: MdOutlineWatchLater,
            href: "/cry3",
        },
        { key: "shared", title: "공유 폴더", icon: FaShareAlt, href: "/cry2" },
    ];

    return (
        <div className={className}>
            <ul>
                {menuItems.map((v) => (
                    <SideBarItems item={v} show={props.show} key={v.key} />
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
