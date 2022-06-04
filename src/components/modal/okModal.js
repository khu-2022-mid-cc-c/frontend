function OkModal(props) {
    return (
        <div className="apiModalContents deleteFileModal">
            <h2>{props.title}</h2>
            <div className="apiModalText">{props.contents}</div>
            <div className="modalBtnZone">
                <button onClick={props.close}>확인</button>
            </div>
        </div>
    );
}

export default OkModal;
