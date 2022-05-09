import Navbar from "../layout/nav/navbar";
import Form from "../auth/form";
import login from "../../assets/img/login.png";
import "./login.css";

export default function Main(props)
{
    const { type } = props;

    return (
        <>
            <Navbar/>
            <Form type={type}/>
        </>
    );
}
