import React, { useState, useEffect } from "react";
import axios from 'axios'

import TaskCard from '../../Component/UI-Elements/Task-Card/Task-Card';

import './Dashboard.css';

const Dashboard = () => {
    const [ tasksExtractor, setTasksExtractor ] = useState([]);
    const [ error, setError ] = useState(false);
    useEffect(() =>{
        axios
        .get('https://localhost:7209/api/ProjectTask/GetTasks')
        .then((response) => {
            setTasksExtractor(response.data)
            console.log(response.data);
        })
        .catch((err) => {
            setError(true)
            console.log(error, err)
        })
    }, []);
    const showAllTasks = tasksExtractor.map((item) => {
        const deadlineDate = new Date(item.taskDeadline.slice(0,10)).toLocaleDateString('fa-IR');
        let usersSeperator = "";
        let categoriesSeperator = "";
        let tasksLength = item.taskUsers.length;
        let categoriesLength = item.taskCategories.length;
 
        if (item.taskUsers !== null && tasksLength === 1) { usersSeperator = "" }
        else if (item.taskUsers !== null && tasksLength >= 1) {usersSeperator = " , " }
        if (categoriesLength === 1) { categoriesSeperator = "" }
        else if (categoriesLength >= 1) { categoriesSeperator = " , "}

        const taskUserEx = item.taskUsers.map((item, index)=>{
            return(
                <React.Fragment>
                    <h5>
                        {item.fullName}
                    </h5>
                    {/* {(() => {
                        if(index !== tasksLength-1) {
                            return (
                                <span> {usersSeperator} </span> 
                            )
                        }
                    })()} */}
                </React.Fragment>
            )
        })
        const taskProjectEx = item.taskCategories.map((item, index)=>{
            return(
                <React.Fragment>
                    <h4>
                        {item.categroyTitle}
                    </h4>
                    {/* {(() => {
                        if(index !== tasksLength-1) {
                            return (
                                <span> {usersSeperator} </span> 
                            )
                        }
                    })()} */}
                </React.Fragment>
            )
        })
        return (
            <TaskCard 
                key={item.id}
                taskTitle={item.title}
                taskDescription={item.description}
                taskPerson={
                    // item.taskUsers !== null ? item.taskUsers.map((item, index)=>{ return(item.fullName + `${index !== tasksLength-1 ? usersSeperator : ""}`)}) : null
                    taskUserEx
                }
                taskProject={
                    // item.taskCategories !== null ? item.taskCategories.map((item, index)=>{ return(item.categroyTitle + `${index !== categoriesLength-1 ? categoriesSeperator : ""}`)}) : null
                    taskProjectEx
                }
                taskDeadline={deadlineDate}
                taskDelete={null}
                taskEdit={null}
            />
        )
    })
    // debugger;

        return (
            <div className="task-card-container">
                {showAllTasks}
            </div>
        )
}

export default Dashboard;