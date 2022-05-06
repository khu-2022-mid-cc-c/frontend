import { useState } from "react";
import "./layout.css";
import SideBar from "./nav/sidebar";
import Navbar from "./nav/navbar";
import Wrapper from "./nav/wrapper";

function Layout(props) {
    let [showSideBar, setShowSideBar] = useState(false);

    return (
        <>
            <Navbar
                toggleSidebar={() => {
                    setShowSideBar(!showSideBar);
                }}
            />
            <div id="container">
                <SideBar show={showSideBar} />
                <Wrapper
                    sideShown={showSideBar}
                    onClick={() => {
                        setShowSideBar(false);
                    }}
                >
                    {props.children}
                </Wrapper>
            </div>
        </>
    );
}

export default Layout;
