import { IconContext } from "react-icons";
import { MdMenu, MdLogin, MdInfoOutline } from "react-icons/md";

function Menubtn(props) {
    return (
        <div>
            <a
                href="/menu"
                onClick={(e) => {
                    e.preventDefault();
                    props.onClick();
                }}
            >
                <div className="navBtns">
                    <IconContext.Provider
                        value={{ size: "30px", color: "white" }}
                    >
                        <MdMenu />
                    </IconContext.Provider>
                </div>
            </a>
        </div>
    );
}

function RightGroup() {
    const icons = [
        { title: "info", icon: MdInfoOutline, href: "/about" },
        { title: "login", icon: MdLogin, href: "/login" },
    ];

    return (
        <div id="rightIconsGroup">
            {icons.map((v) => {
                return (
                    <a href={v.href} title={v.title}>
                        <div className={"navBtns"}>
                            <IconContext.Provider
                                value={{ size: "24px", color: "white" }}
                            >
                                <v.icon />
                            </IconContext.Provider>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}

function Navbar(props) {
    return (
        <div id="navTop">
            <Menubtn onClick={props.toggleSidebar} />
            <RightGroup />
        </div>
    );
}

export default Navbar;
