import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//쿠키 내부 토큰 get, set 함수
import { setCookies, getCookies } from "../Util";

export default function Login()
{
    const navigate = useNavigate();

    const [login, setLogin] = useState({id: "", password: ""});
    const { id, password } = login;
  
    const onChange = (e) => {
      const { value, name } = e.target;
      setLogin({
        ...login,
        [name]: value
      });
    };

    const onClickLogin = async () => {
        try {
            const response = await axios.post('/api/user/auth/login', login);
            //로그인 성공시, 파일 관리 페이지로 이동
            if(response.result) {
                setCookies(response.token);
                navigate("/");
            }
            else alert("아이디 또는 비밀번호가 틀렸습니다.");
            console.log(response);
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className="Form-Container">
            <div className="Form-container">
                <div className="login-text">LOGIN</div>
                <div className="wrap-container"> 
                    <div>
                        <label>아이디</label>
                        <div>
                            <input name="id" onChange={onChange} value={id} required/>
                        </div>
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <div>
                            <input name="password" onChange={onChange} value={password} required/>
                        </div>
                    </div>
                    <div>
                        <button className="login-btn" onClick={onClickLogin}>로그인</button>
                        <div className="register-btn-container">
                            <button className="guest-btn" onClick={ () => window.location.replace("/") }>게스트 모드로 계속하기</button>
                            <button className="register-btn" onClick={ () => window.location.replace("/register") }>| &nbsp;&nbsp;&nbsp;회원가입 </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}