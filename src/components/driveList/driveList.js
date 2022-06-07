import { useEffect, useState } from "react";
// import axios from "axios";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";

import Layout from "../layout/layout";
import Modal from "../modal/modal";
import OkModal from "../modal/okModal";
import callAPI from "../lib/callAPI";

import DriveItem from "./driveItem";
import NewDrive from "./newDrive";
import "./driveList.css";

function DriveList(props) {
    const [drives, setDrives] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    const loadDrives = () => {
        callAPI("GET", "https://linkhu.which.menu//api/drive/manage/list", null)
            .then((data) => setDrives(data.drives))
            .catch((error) => console.log(error));
    };

    const setModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const showOkModal = (title, contents) => {
        setModal(
            <OkModal
                title={title}
                contents={contents}
                close={() => setShowModal(false)}
            />
        );
    };

    useEffect(() => {
        loadDrives();
    }, []);

    return (
        <>
            <Layout>
                <div className="driveList">
                    <div className="driveListAbove">
                        <span className="driveListTitle" style={{cursor: "default"}}>드라이브 목록</span>
                        <span
                            className="driveListAdd"
                            onClick={() => {
                                setModal(
                                    <NewDrive
                                        driveList={drives}
                                        close={() => {
                                            setShowModal(false);
                                        }}
                                        next={showOkModal}
                                        reload={loadDrives}
                                    />
                                );
                            }}
                        >
                            <IconContext.Provider
                                value={{ size: "20px", color: "#666666" }}
                            >
                                <AiOutlinePlus />
                            </IconContext.Provider>
                            &nbsp;추가
                        </span>
                    </div>
                    <div className="drives">
                        {drives.map((v) => (
                            <DriveItem key={v.id} drive={v} />
                        ))}
                    </div>
                </div>
            </Layout>
            <Modal
                isOpen={showModal}
                close={() => {
                    setShowModal(false);
                }}
                size={"medium"}
            >
                {modalContent}
            </Modal>
        </>
    );
}

export default DriveList;
