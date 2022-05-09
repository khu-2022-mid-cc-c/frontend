import { useState, useEffect } from "react";
import "./form.css";

function FormComponent({ type })
{
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const inputHandler = (({ target }) => {
        if(type === "id") setUserId(target.value);
        else if(type === "pw") setUserPw(target.value);
        else if(type === "email") setUserEmail(target.value);
    })

    return(
        <form>
            <input value={type === "id" ? userId : userPw} onChange={inputHandler} required/>
        </form>
    );
}

export default function Form({ type })
{

    return(
        <div className="Form-Container">
            <div className="Form-container">
                <div className="login-text"> { type } </div>
                <div className="wrap-container"> 
                    <div>
                        <label>아이디</label>
                        <FormComponent type={"id"} />
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <FormComponent type={"pw"} />
                    </div>
                    {type === "REGISTER" &&
                    <div>
                        <label>이메일</label>
                        <FormComponent type={"email"} />
                    </div>
                    }
                    <div>
                        {type === "LOGIN" ?
                        <>
                        <button className="login-btn">로그인</button>
                        <div className="register-btn-container">
                            <button className="guest-btn" onClick={ () => window.location.replace("/") }>게스트 모드로 계속하기</button>
                            <button className="register-btn" onClick={ () => window.location.replace("/register") }>| &nbsp;&nbsp;&nbsp;회원가입 </button>
                        </div>
                        </>
                        : <button className="login-btn">회원가입</button>}
                    </div>
                </div>
            </div>
        </div>
        
    );
}