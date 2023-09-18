import React from "react";

import './Project-Card.css';

const ProjectCard = (props) => {
    return (
        <div className="project-card">
            <h3>{props.projectTitle}</h3>
            <section className="project-card-description">{props.projectDescription}</section>
            <section className="d-flex justify-content-center"><h5>Created By {props.projectPerson}</h5></section>
            <div style={{ bottom: '15px', position:'absolute', marginRight:'70px', marginLeft:'70px' }}>
                <button onClick={props.projectDelete} className="delete-button-project-card  align-items-end"><i className="fa fa-trash"></i></button>
                <button onClick={props.projectEdit} className="edit-button-project-card  align-items-end" ><i className="fa fa-edit"></i></button>
            </div>
        </div>
    )
}
   
  export default ProjectCard;