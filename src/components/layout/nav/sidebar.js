import { FaShareAlt, FaRegUser } from "react-icons/fa";
import {
    MdOutlineDriveFolderUpload,
    MdOutlineWatchLater,
} from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { isCookies } from "../../Util";

function SideBarItems(props) {
    const navigation = useNavigate();

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
                    <span style={{cursor: "pointer"}} onClick={ () => navigation(props.item.link) }>{props.item.title}</span>
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
            link: "/drives"
        },
        {
            key: "recent",
            title: "최근 파일",
            icon: MdOutlineWatchLater,
            href: "/cry3",
            link: "/cry3"
        },
        { 
            key: "shared", 
            title: "공유 폴더", 
            icon: FaShareAlt, 
            href: "/cry2", 
            link: "/cry2" 
        },
        { 
            key: "register", 
            title: "회원가입", 
            icon: FaRegUser, 
            href: "/cry2", 
            link: "/register" 
        },
    ];

    return (
        <div className={className}>
            <ul>
                {menuItems.map((v) => (
                    <>
                        {isCookies("id") ? <SideBarItems item={v} show={props.show} key={v.key} /> :
                            v.key !== "register" && <SideBarItems item={v} show={props.show} key={v.key} />
                        }
                    </>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
