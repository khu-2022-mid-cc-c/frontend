import Navbar from "../layout/nav/navbar";
import Register from "./register";
import Login from "./login";

import "./form.css";
import authImg from "../../assets/img/login.png";

export default function Main(props)
{
    const { type } = props;

    return (
        <>
            <Navbar/>
            <div className="auth-container">
                <div className="aside-img"><img src={authImg}/></div>
                {type === "LOGIN"?<Login/>:<Register/>}
            </div>
        </>
    );
}
