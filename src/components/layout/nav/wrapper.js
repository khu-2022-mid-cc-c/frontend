function Wrapper(props) {
    let sideShown = props.sideShown ? "sideshown" : "";
    return (
        <div id="wrap" className={sideShown} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default Wrapper;
