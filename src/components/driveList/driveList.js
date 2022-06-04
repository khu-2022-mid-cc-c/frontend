import { useEffect, useState } from "react";
// import axios from "axios";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";

import Layout from "../layout/layout";
import Modal from "../modal/modal";

import DriveItem from "./driveItem";
import NewDrive from "./newDrive";
import "./driveList.css";

function DriveList(props) {
    const [drives, setDrives] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // axios(config).then((res) => {setDrives(res.data)})
        setTimeout(() => {
            setDrives([
                {
                    id: "drive_id",
                    name: "테스트 드라이브 1",
                    is_owner: true,
                },
                {
                    id: "drive_id_2",
                    name: "테스트 드라이브 2",
                    is_owner: false,
                },
            ]);
        }, 1000);
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
                                setShowModal(true);
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
                            <DriveItem drive={v} own={false} />
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
                <NewDrive
                    close={() => {
                        setShowModal(false);
                    }}
                />
            </Modal>
        </>
    );
}

export default DriveList;
