import Navbar from "../layout/nav/navbar";
import backVid from "../../assets/video/about.mp4";
import { IoChevronDown } from "react-icons/io5";

import isAdmin from "../route/admin";

import "./about.css";

export default function About() {
    return (
        <>
            <Navbar/>
            <div className="about-container">
                <video muted autoPlay loop style={{width: "100%", height: "100vh", objectFit: "cover"}}>
                    <source src={backVid} type="video/mp4" />
                    <strong>Your browser does not support the video tag.</strong>
                </video>
                <div className="title">Linkhu.</div>
                <div className="contents">Linkhu는 백업보다는 공유에 초점을 두었다. 일반적인 드라이브가 지니고
                 있는<br/> 파일의 업로드와 다운로드, 삭제, 복사 등의 기본적인 기능들을 제공한다.
                하이퍼<br/>링크나 QR코드를 생성하여 멤버를 손쉽게 초대, 공유 드라이브 내의
                 파일 혹은 디<br/>렉토리를 공유할 수 있다. 멤버들은 드라이브를 원하는 대로 꾸밀
                  수 있으며, 드라<br/>이브를 공유하는 멤버들의 추억이 담긴 사진, 영상 등을 Iframe
                   태그를 생성하여<br/>블로그 포스트나 사이트에 첨부할 수 있다. 따라서 Linkhu은 단순히
                    데이터를 저<br/>장하는 기존 드라이브에서 더 나아가, 추억을 공유하는 플랫폼이라고도 할 수 있다.</div>
                    <IoChevronDown className="icon" size={28}/>
                    <button className="btn" onClick={ isAdmin() ? () => window.location.replace("/drives") : () => window.location.replace("/login") }>Go, Linkhu.</button>
            </div>
        </>
    );
}