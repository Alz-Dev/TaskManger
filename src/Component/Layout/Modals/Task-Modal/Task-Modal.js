import React, {useState, useEffect} from "react";

import "./Task-Modal.css";

const TaskModal = (props) => {
    const [ modalFocused, setModalFocused ] = useState(Boolean);
    useEffect(() => {
        setModalFocused(props.showModal);
    }, [props.showModal]);
    return (
        <div className="main-modal-task" style={{ opacity: modalFocused ? '1' : '0', display: modalFocused ? 'block' : 'none' }}>
            <div className="back-fade-black" onClick={props.modalClose} />
            <div className="task-modal-container" style={{ transform: modalFocused ? 'translateY(0)' : 'translateY(-100vh)',  opacity: modalFocused ? '1' : '0' }}>
                <div className="task-modal-header"><button className="btn-close btn-close-miner" onClick={props.modalClose}></button></div>
                <div className="task-modal-body" >{props.children}</div>
            </div>
        </div>
    )

}

export default TaskModal;