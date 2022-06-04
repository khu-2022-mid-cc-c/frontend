import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdSettings } from "react-icons/io";

import { setCookies, getCookies } from "../Util";

export default function BackImg()
{
    const [bgImgUrl, setBgImgUrl] = useState("");
    const [formData, setFormData] = useState();

    //...배경 이미지 관련
    const readImage = (target) => {
        if(target.files && target.files[0]) {
            const reader = new FileReader();
            reader.onload = ({ target }) => {
                setBgImgUrl(target.result);
            }
            reader.readAsDataURL(target.files[0]);
        }
    }

    const formDataImg = (target) => {
        if (target.files) {
            const formData = new FormData()
            formData.append('myPageImg', target.files[0])
            setFormData(formData)
        }
    }

    const bgImgChangeHandler = ({ target }) => {
        readImage(target);
        formDataImg(target);
        console.log(bgImgUrl);
    }

    //배경 이미지 변경 -> api call
    /*
    useEffect(() => {
        try {
            const response = axios.post();
        } catch(err) {
            console.log(err);
        }
    }, [formData])
    */
    //...

    return(
        <div className="background-container" style={{backgroundImage: `url(${bgImgUrl})`}}>
            <input type="file" id="bgImg" style={{ display: 'none' }} onChange={bgImgChangeHandler} />
            <label htmlFor="bgImg"><IoMdSettings className="icon"/></label>
        </div>
    );
}