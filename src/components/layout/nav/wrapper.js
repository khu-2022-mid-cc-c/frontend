function Wrapper(props) {
    let sideShown = props.sideShown ? "sideshown" : "";
    return (
        <div className={`wrap ${sideShown}`} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default Wrapper;
