import "./modal.css";
import Modal from "react-modal";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const SIZE = {
    small: { width: "30vw", height: "50vh" },
    medium: { width: "40vw", height: "60vh" },
    large: { width: "50vw", height: "70vh" },
};

function myModal(props) {
    Modal.setAppElement("#root");

    return (
        <Modal
            isOpen={props.isOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={props.close}
            style={{
                content: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: SIZE[props.size].width,
                    height: SIZE[props.size].height,
                    alignSelf: "center",
                },
            }}
        >
            <div className="modalClose" onClick={props.close}>
                <IconContext.Provider
                    value={{ size: "20px", color: "#666666" }}
                >
                    <AiOutlineClose />
                </IconContext.Provider>
            </div>
            {props.children}
        </Modal>
    );
}

export default myModal;
