function MakeFolder(props) {
    return (
        <div className="makeFolderModal">
            <h2>폴더 만들기</h2>
            <input placeholder="파일 이름 입력" />
            <div className="modalBtnZone">
                <button>생성</button>
            </div>
        </div>
    );
}

export default MakeFolder;
