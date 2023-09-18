import React, { useState } from "react";

import './task-Card.css';

const TaskCard = (props) => {
    let taskProjectPropLength = props.taskProject === null ? 0 : props.taskProject.length ;
    let taskPersonPropLength = props.taskPerson === null ? 0 : props.taskPerson.length ;
    // let taskPersonsHSeperated = props.taskPerson !== null ? props.taskPerson.split(',') : null;
    // let taskProjectsHSeperated = props.taskProject.split(',');
    // let taskPersonsShower = taskPersonsHSeperated.map((item)=>{return(<h4>item</h4>)})
    return (
        <div className="task-card">
            <h3>{props.taskTitle}</h3>
            <section className={'task-card-description' + `${taskPersonPropLength === 0 && taskProjectPropLength === 0 && props.taskDelete !== null ? ' mb-70' : ''}` + `${taskPersonPropLength === 0 && taskProjectPropLength === 0 && props.taskDelete === null ? ' mb-30' : ''}`} >{props.taskDescription}</section>
            {(() => {
                if(taskPersonPropLength !== 0) {
                    return (
                        <section className={'task-card-person' + `${taskProjectPropLength === 0 && props.taskDelete !== null ? ' mb-70' : ''}` + `${taskProjectPropLength === 0 && props.taskDelete === null  ? ' mb-30' : ''}`}>
                            <h5>Persons:</h5>
                            {props.taskPerson}
                        </section>
                    )
                }
            })()}
            {(() => {
                if(taskProjectPropLength !== 0) {
                    return (
                        <section className={'task-card-project'  + `${taskPersonPropLength === 0 && props.taskDelete !== null ? ' mb-70' : ''}` + `${taskPersonPropLength === 0 && props.taskDelete === null  ? ' mb-30' : ''}` + `${props.taskDelete !== null ? ' mb-70' : ' mb-30'}`}>
                            <h4>Projects:</h4>
                            {props.taskProject}
                        </section>
                    )
                }
            })()}
            
            {(() => {
                if(taskPersonPropLength !== 0 && taskProjectPropLength !== 0) {
                    return (
                        <div className="buttons-and-deadline-container">
                            <section className="task-card-deadline justify-content-center"><span> Deadline: </span>{props.taskDeadline}</section>
                            <div>
                                {(() => {
                                    if(taskPersonPropLength !== 0 && taskProjectPropLength !== 0) {
                                        return (
                                            <div style={{ display: 'inline' }}>
                                                {(() => {
                                                    if(props.taskDelete !== null) {
                                                        return (
                                                            <button onClick={props.taskDelete} className="delete-button-task-card align-items-end"><i className="fa fa-trash"></i></button>
                                                        )
                                                    }
                                                })()}
                                            </div>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if(taskPersonPropLength !== 0 && taskProjectPropLength !== 0) {
                                        return (
                                            <div style={{ display: 'inline' }}>
                                                {(() => {
                                                    if(props.taskEdit !== null) {
                                                        return (
                                                            <button onClick={props.taskEdit} className="edit-button-task-card align-items-end"><i className="fa fa-edit"></i></button>
                                                        )
                                                    }
                                                })()}
                                            </div>                    
                                        )
                                    }
                                })()}
                            </div>
                        </div>
                    )
                }
                else if(taskPersonPropLength === 0) {
                    return (
                        <div className="buttons-and-deadline-container">
                            <section className="task-card-deadline "><span> Deadline: </span>{props.taskDeadline}</section>
                            <div>
                                {(() => {
                                    if(props.taskDelete !== null) {
                                        return (
                                            <button onClick={props.taskDelete} className="delete-button-task-card align-items-end"><i className="fa fa-trash"></i></button>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if(props.taskEdit !== null) {
                                        return (
                                            <button onClick={props.taskEdit} className="edit-button-task-card align-items-end"><i className="fa fa-edit"></i></button>
                                        )
                                    }
                                })()}
                            </div>
                        </div>
                    )
                }
                else if(taskProjectPropLength === 0) {
                    return (
                        <div className="buttons-and-deadline-container">
                            <section className="task-card-deadline "><span> Deadline: </span>{props.taskDeadline}</section>
                            <div>
                                {(() => {
                                    if(props.taskDelete !== null) {
                                        return (
                                            <button onClick={props.taskDelete} className="delete-button-task-card align-items-end"><i className="fa fa-trash"></i></button>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if(props.taskEdit !== null) {
                                        return (
                                            <button onClick={props.taskEdit} className="edit-button-task-card align-items-end"><i className="fa fa-edit"></i></button>
                                        )
                                    }
                                })()}
                            </div>
                        </div>
                    )
                }
            })()}
            {/* <div>
                {(() => {
                    if(taskPersonPropLength !== 0 && taskProjectPropLength !== 0) {
                        return (
                            <div style={{ display: 'inline' }}>
                                {(() => {
                                    if(props.taskDelete !== null) {
                                        return (
                                            <button onClick={props.taskDelete} className="delete-button-task-card align-items-end"><i className="fa fa-trash"></i></button>
                                        )
                                    }
                                })()}
                            </div>
                        )
                    }
                })()}
                {(() => {
                    if(taskPersonPropLength !== 0 && taskProjectPropLength !== 0) {
                        return (
                            <div style={{ display: 'inline' }}>
                                {(() => {
                                    if(props.taskEdit !== null) {
                                        return (
                                            <button onClick={props.taskEdit} className="edit-button-task-card align-items-end"><i className="fa fa-edit"></i></button>
                                        )
                                    }
                                })()}
                            </div>                    
                        )
                    }
                })()}
           </div> */}
        </div>
    )
}
    
  export default TaskCard;