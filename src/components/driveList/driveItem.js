import { IconContext } from "react-icons";
import { AiOutlineFolder } from "react-icons/ai";

function DriveItem(props) {
    return (
        <div
            className={`driveItem ${props.drive.is_owner ? "own" : "shared"}`}
            onClick={() => {
                window.location.href = `/drive/${props.drive.id}`;
            }}
        >
            <IconContext.Provider value={{ size: "50px", color: "#666666" }}>
                <AiOutlineFolder />
            </IconContext.Provider>
            <div className="driveTxt">
                <p className="driveName">{props.drive.name}</p>
                <p className="driveDesc">
                    {props.drive.is_owner
                        ? "보유 드라이브"
                        : "공유받은 드라이브"}
                </p>
            </div>
        </div>
    );
}

export default DriveItem;
