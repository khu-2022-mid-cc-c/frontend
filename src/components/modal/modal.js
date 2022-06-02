import "./modal.css";
import Modal from "react-modal";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const SIZE = {
    small: {
        width: "30vw",
        height: "50vh",
        minWidth: "500px",
        minHeight: "400px",
    },
    medium: {
        width: "40vw",
        height: "60vh",
        minWidth: "650px",
        minHeight: "450px",
    },
    large: {
        width: "50vw",
        height: "70vh",
        minWidth: "800px",
        minHeight: "500px",
    },
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
                    minWidth: SIZE[props.size].minWidth,
                    minHeight: SIZE[props.size].minHeight,
                    alignSelf: "center",
                    overflow: "hidden",
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
