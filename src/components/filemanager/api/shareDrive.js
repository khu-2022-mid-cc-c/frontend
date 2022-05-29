function ShareDrive(props) {
    return (
        <div className="shareDriveModal">
            <h2>폴더 공유</h2>
            <input placeholder="공유할 유저 id 입력" />
            <div className="modalBtnZone">
                <button>공유</button>
            </div>
        </div>
    );
}

export default ShareDrive;
