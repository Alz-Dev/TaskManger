import React, {useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import { Modal, Button } from "bootstrap";


import "./Select-Person-Modal.css";

const SelectPersonModal = (props) => {
    const [ modalFocused, setModalFocused ] = useState(Boolean);
    useEffect(() => {
        setModalFocused(props.showModal);
    }, [props.showModal]);
    return (
        <div className="main-modal-profile-selector" style={{ opacity: modalFocused ? '1' : '0', display: modalFocused ? 'block' : 'none' }}>
                <div className="back-fade-black" onClick={props.modalClose}/>
                <div className="select-profiles-container" style={{ transform: modalFocused ? 'translateY(0)' : 'translateY(-100vh)',  opacity: modalFocused ? '1' : '0' }}>
                    <div className="select-profiles-header"><button className="btn-close btn-close-miner" onClick={props.modalClose}></button></div>
                    <div className="select-profiles-body" >{props.children}</div>
                </div>
        </div>
    )
}

export default SelectPersonModal;