import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setCookies, getCookies, isCookies } from "../Util";

function Register() {
    const navigate = useNavigate();
    //회원가입 비성공시, 메시지
    const MESSAGE = [
        { message: "Not guest account", result: "게스트 계정이 아닙니다."}, 
        { message: "ID already exists", result: "존재하는 아이디입니다."}, 
        { message: "Nickname already exists", result: "존재하는 닉네임입니다."}, 
        { message: "Forbidden word contained", result: "ID나 닉네임에 금지된 문자가 포함되어 있습니다."}];
    
    //회원가입 정보 관련 변수
    const [forms, setForms] = useState({id: "", password: "", nickname: ""});
    const { id, password, nickname } = forms;
  
    const onChange = (e) => {
      const { value, name } = e.target;
      setForms({
        ...forms,
        [name]: value
      });
    };

    const onClickRegister = async () => {
        try {
            const response = await axios.post('https://linkhu.which.menu//api/user/auth/signup', forms);
            //가입 성공시, 로그인 페이지로 이동
            if(response.data.result) navigate("/login");
            else alert(MESSAGE.find( m => m.message === response.data.message).result);
        } catch(err) {
            console.log(err);
        }
    }
  
    const guestRegisterHandler = async () => {
        try {
            const response = await axios.post('https://linkhu.which.menu//api/user/auth/switch_guest', forms);
            if(response.data.result) {
                if(isCookies('id')) document.cookie = 'id' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                navigate("/login");
            }
            else alert(MESSAGE.find( m => m.message === response.data.message).result);
        } catch(err) {
            console.log(err);
        }
    }
  
    return (
    <div className="Form-Container">
        <div className="Form-container">
            <div className="login-text">REGISTER</div>
            <div className="wrap-container"> 
                <div>
                    <label>아이디</label>
                    <div>
                        <input name="id" onChange={onChange} value={id} />
                    </div>
                </div>
                <div>
                    <label>비밀번호</label>
                    <div>
                        <input name="password" onChange={onChange} value={password} />
                    </div>
                </div>
                <div>
                    <label>닉네임</label>
                    <div>
                        <input name="nickname" onChange={onChange} value={nickname} />
                    </div>
                </div>
                <button className="login-btn" onClick={ isCookies('id') ? guestRegisterHandler : onClickRegister }>회원가입</button> 
            </div>
        </div>
    </div>
    );
  }
  
  export default Register;