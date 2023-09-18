import React, { useState, useEffect } from "react";
import axios from "axios";

import TaskCard from '../../Component/UI-Elements/Task-Card/Task-Card';
import TaskModal from '../../Component/Layout/Modals/Task-Modal/Task-Modal';
import TaskModalForm from '../../Component/UI-Elements/Task-Modal-Form/Task-Modal-Form';


import './Tasks.css';



const Tasks = (props) => {
    
    const todayDefaultDate = new Date();

    const [ userTasksExtractor, setUserTasksExtractor ] = useState([]);
    const [ noneUserTasksExtractor, setNoneUserTasksExtractor ] = useState([]);
    const [ projectsExtractor, setProjectsExtractor ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ deleteSelectedId, setDeleteSelectedId ] = useState(null);
    const [ newOrEditSelectedId, setNewOrEditSelectedId ] = useState(0);
    const [ taskTitleForEdit, setTaskTitleForEdit ] = useState(null);
    const [ taskTitleForShow, setTaskTitleForShow ] = useState(null);
    const [ taskDescriptionForEdit, setTaskDescriptionForEdit ] = useState(null);
    const [ popupModalCondition, setPopupModalCondition ] = useState(false);
    const [ refresherAfterAddOrEdit, setRefresherAfterAddOrEdit ] = useState(false);
    const [ choosedDeadlineDate, setChoosedDeadlineDate ] = useState(new Date());
    const [ modalClearerDate, setModalClearerDate ] = useState(false);
    const [ usersListId, setUsersListId ] = useState([]);
    const [ projectsListId, setProjectsListId ] = useState([]);
    const [ selectedUserIdsForAddOrEdit, setSelectedUserIdsForAddOrEdit ] = useState(null);
    const [ selectedCategoryIdsForAddOrEdit, setSelectedCategoryIdsForAddOrEdit ] = useState(null);
    const [ formData, setFormData ] = useState({
        id: 0,
        title: null,
        description: null,
        taskDeadline: new Date(todayDefaultDate).toLocaleDateString('en-US'),
        taskCategoryIds: null,
        taskUserIds: null
    });



    useEffect(() =>{
        (async () => {
            const rex = await axios
            .get(`https://localhost:7209/api/UserTask/GetUserTask/${props.selectedProfile}`);
                setUserTasksExtractor(rex.data);
        })();
    }, [props.selectedProfile]);
    useEffect(() =>{
        (async () => {
            const rex = await axios
            .get(`https://localhost:7209/api/UserTask/GetUserTask/${props.selectedProfile}`);
                setUserTasksExtractor(rex.data);
        })();
    }, [refresherAfterAddOrEdit]);
    useEffect(() =>{
        (async () => {
            const rex = await axios
            .get('https://localhost:7209/api/ProjectTask/GetTasks');
                setNoneUserTasksExtractor(rex.data);
        })();
    }, [refresherAfterAddOrEdit]);
    useEffect(() =>{
        (async () => {
            const rex = await axios
            .get('https://localhost:7209/api/Category');
                setProjectsExtractor(rex.data);
        })();
    }, []);
    
    useEffect(()=>{
        let newRow = [];
        const newArray = usersListId
        for (let i = 0; i < props.profileList.length; i++) {
            newRow = {'value': props.profileList[i].id, 'label': props.profileList[i].fullName }
            newArray.push(newRow);
            setUsersListId([...newArray]);       
        }
    },[props.profileList])
    useEffect(()=>{
        let newRow = [];
        const newArray = projectsListId;
        for (let i = 0; i < projectsExtractor.length; i++) {
            newRow = {'value': projectsExtractor[i].id, 'label': projectsExtractor[i].title }
            newArray.push(newRow);
            setProjectsListId([...newArray]);       
        }
    },[projectsExtractor])
    useEffect(() =>{
        if( refresherAfterAddOrEdit ) {setRefresherAfterAddOrEdit(false);}
    }, [refresherAfterAddOrEdit]);

    useEffect(()=>{
        setFormData({...formData, id: newOrEditSelectedId})
    },[newOrEditSelectedId])
    useEffect(()=>{
        setFormData({...formData, title: taskTitleForEdit})
    },[taskTitleForEdit])
    useEffect(()=>{
        setFormData({...formData, description: taskDescriptionForEdit})
    },[taskDescriptionForEdit])

    useEffect(() => {
        let choosedDate = new Date(choosedDeadlineDate).toLocaleDateString('en-US');
        setFormData({...formData, taskDeadline: choosedDate})
        console.log(formData)
    },[choosedDeadlineDate])
    useEffect(() => {
        let users = selectedUserIdsForAddOrEdit !== null ? selectedUserIdsForAddOrEdit.map((item)=>{ return(item.value)}) : null;
        setFormData({...formData, taskUserIds: users})
    },[selectedUserIdsForAddOrEdit])
    useEffect(() => {
        let categories = selectedCategoryIdsForAddOrEdit !== null ? selectedCategoryIdsForAddOrEdit.map((item)=>{ return(item.value)}) : null;
        setFormData({...formData, taskCategoryIds: categories})
    },[selectedCategoryIdsForAddOrEdit])

    useEffect(() =>{
        setDeleteSelectedId(null);
    }, [deleteSelectedId]);

    const taskDeleteHandler = (id) => {
        setDeleteSelectedId(id);
        if(window.confirm('آیا برای حذف مطمئن هستید؟')) {
            (async () => {
                const rex = await axios
                .delete(`https://localhost:7209/api/ProjectTask/DeleteTask/${id}`);
                if (rex.status === 200) {alert(`تسک با آی دی ${id} باموفقیت حذف شد`)}
                else {alert(`حذف ناموفق بود!`)}
            })();
        }
        setRefresherAfterAddOrEdit(true);
        console.log(refresherAfterAddOrEdit);
    }
    const taskAddNewOrEditHandler = (id) => {
        if (newOrEditSelectedId === 0) {
            (async () => {
                const rex = await axios
                .post('https://localhost:7209/api/ProjectTask/CreateTask', formData)
                if (rex.status === 200) {alert(`تسک با موفقیت ایجاد شد`)}
                else {alert(`ایجاد تسک ناموفق بود!`)}
            })();
            setPopupModalCondition(false);
            setRefresherAfterAddOrEdit(true);
            setPopupModalCondition(false);
            setNewOrEditSelectedId(0);
            setTaskTitleForEdit(null);
            setTaskTitleForShow(null);
            setTaskDescriptionForEdit(null);
            setChoosedDeadlineDate(todayDefaultDate);
            setSelectedUserIdsForAddOrEdit(null);
            setSelectedCategoryIdsForAddOrEdit(null);
            console.log(formData);
        }
        else { 
            (async () => {
                const rex = await axios
                .put('https://localhost:7209/api/ProjectTask/EditTask', formData)
                if (rex.status === 200) {alert(`تسک با موفقیت ویرایش شد`)}
                else {alert(`ویرایش تسک ناموفق بود!`)}
            })();
            setPopupModalCondition(false);
            setRefresherAfterAddOrEdit(true);
            setPopupModalCondition(false);
            setNewOrEditSelectedId(0);
            setTaskTitleForEdit(null);
            setTaskTitleForShow(null);
            setTaskDescriptionForEdit(null);
            setChoosedDeadlineDate(todayDefaultDate);
            setSelectedUserIdsForAddOrEdit(null);
            setSelectedCategoryIdsForAddOrEdit(null);
            console.log(formData);
        }
    }
    const taskModalToggler = (id, tName, tDescription, tUserIds, tDeadline, tCategoryIds) => {
        setNewOrEditSelectedId(id);
        setTaskTitleForEdit(tName);
        setTaskTitleForShow(tName);
        setTaskDescriptionForEdit(tDescription);
        setPopupModalCondition(true);
        setRefresherAfterAddOrEdit(true);

        if (tDeadline !== null) {
            setChoosedDeadlineDate(tDeadline)
        } else {
            setChoosedDeadlineDate(todayDefaultDate)
        }

        let newRowForUser = [];
        let newArrayForUser = [];
        if (tUserIds !== null) {
            tUserIds.map((item)=>{
                usersListId.map((iitem)=>{
                    if(iitem.value === item) { newRowForUser = iitem }
                })
                newArrayForUser.push(newRowForUser);
                setSelectedUserIdsForAddOrEdit(newArrayForUser); 
            })
        }


        let newRowForCategory = [];
        let newArrayForCategory = [];
        if (tCategoryIds !== null) {
            tCategoryIds.map((item)=>{
                projectsListId.map((iitem)=>{
                    if(iitem.value === item) { newRowForCategory = iitem }
                })
                newArrayForCategory.push(newRowForCategory);
                setSelectedCategoryIdsForAddOrEdit(newArrayForCategory); 
            })
        }
        let choosedDate = new Date(choosedDeadlineDate).toLocaleDateString('en-US');
        let users = selectedUserIdsForAddOrEdit !== null ? selectedUserIdsForAddOrEdit.map((item)=>{ return(item.value)}) : null;
        let categories = selectedCategoryIdsForAddOrEdit !== null ? selectedCategoryIdsForAddOrEdit.map((item)=>{ return(item.value)}) : null;
        setFormData({
            id: id,
            title: tName,
            description: tDescription,
            taskDeadline: choosedDate,
            taskCategoryIds: categories,
            taskUserIds: users
        });

    }
    const closeTaskModalHandler = () => {
        setPopupModalCondition(false);
        setNewOrEditSelectedId(0);
        setRefresherAfterAddOrEdit(true);
        setTaskTitleForEdit(null);
        setTaskTitleForShow(null);
        setTaskDescriptionForEdit(null);
        setChoosedDeadlineDate(todayDefaultDate);
        setSelectedUserIdsForAddOrEdit(null);
        setSelectedCategoryIdsForAddOrEdit(null);
        let DateiNf = new Date(todayDefaultDate).toLocaleDateString('en-US');
        setFormData({
            id: 0,
            title: null,
            description: null,
            taskDeadline: DateiNf,
            taskCategoryIds: null,
            taskUserIds: null
        });

    }
    
    const showAllUserTasks = userTasksExtractor.map((item) => {
        const deadlineDateJalali = new Date(item.task.taskDeadline.slice(0,10)).toLocaleDateString('fa-IR');
        const defultDeadlineDate = new Date(item.task.taskDeadline);
        let categoriesSeperator = "";
        let categoriesLength = item.task.taskCategories !== null ? item.task.taskCategories.length : null;
 
        if (categoriesLength === 1) { categoriesSeperator = "" }
        else if (categoriesLength >= 1) { categoriesSeperator = " , "}

        // const taskCategoriesForTaskCard = item.task.taskCategories !== null ? item.task.taskCategories.map((item, index)=>{ return(item.categroyTitle + `${index !== categoriesLength-1 ? categoriesSeperator : ""}`)}) : null;
        const taskUserIdExtractor =  item.task.taskUsers !== null ? item.task.taskUsers.map((item)=>{ return(item.id)}) : null
        const taskCategoryIdExtractorForEdit =  item.task.taskCategories !== null ? item.task.taskCategories.map((item)=>{ return(item.categoryId)}) : null
        // const taskUserEx = item.task.taskUsers.map((item, index)=>{
        //     return(
        //         <React.Fragment>
        //             <h5>
        //                 {item.fullName}
        //             </h5>
        //             {/* {(() => {
        //                 if(index !== tasksLength-1) {
        //                     return (
        //                         <span> {usersSeperator} </span> 
        //                     )
        //                 }
        //             })()} */}
        //         </React.Fragment>
        //     )
        // })
        const taskUserEx = item.task.taskUsers.map((item, index)=>{
            if (item.id === props.selectedProfile) {
                return(
                    <React.Fragment>
                        <h5>
                            شما
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
            } else {
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
            }
        })
        const taskProjectEx = item.task.taskCategories.map((item, index)=>{
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
                key={item.task.id}
                taskTitle={item.task.title}
                taskDescription={item.task.description}
                taskPerson={taskUserEx}
                taskProject={taskProjectEx}
                taskDeadline={deadlineDateJalali}
                taskDelete={(e, id) =>{e.preventDefault(); taskDeleteHandler(item.task.id)}}
                taskEdit={(e, id) =>{e.preventDefault(); taskModalToggler(item.task.id, item.task.title, item.task.description, taskUserIdExtractor, defultDeadlineDate, taskCategoryIdExtractorForEdit);}}
                
            />
        )
    })    
    const showAllNoneUserTasks = noneUserTasksExtractor.map((item) => {
        const deadlineDateJalali = new Date(item.taskDeadline.slice(0,10)).toLocaleDateString('fa-IR');
        const defultDeadlineDate = new Date(item.taskDeadline);
        let categoriesSeperator = "";
        let categoriesLength = item.taskCategories !== null ? item.taskCategories.length : null;
 
        if (categoriesLength === 1) { categoriesSeperator = "" }
        else if (categoriesLength >= 1) { categoriesSeperator = " , "}

        // const taskCategoriesForTaskCard = item.taskCategories !== null ? item.taskCategories.map((item, index)=>{ return(item.categroyTitle + `${index !== categoriesLength-1 ? categoriesSeperator : ""}`)}) : null;
        const taskCategoryIdExtractorForEdit =  item.taskCategories !== null ? item.taskCategories.map((item)=>{ return(item.categoryId)}) : null
        // const taskUserEx = item.taskUsers.map((item, index)=>{
        //     return(
        //         <React.Fragment>
        //             <h5>
        //                 {item.fullName}
        //             </h5>
        //             {/* {(() => {
        //                 if(index !== tasksLength-1) {
        //                     return (
        //                         <span> {usersSeperator} </span> 
        //                     )
        //                 }
        //             })()} */}
        //         </React.Fragment>
        //     )
        // })
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
        if ( item.taskUsers.length === 0 ) {
            return (
                <TaskCard 
                    key={item.id}
                    taskTitle={item.title}
                    taskDescription={item.description}
                    taskPerson={null}
                    taskProject={taskProjectEx}
                    taskDeadline={deadlineDateJalali}
                    taskDelete={(e, id) =>{e.preventDefault(); taskDeleteHandler(item.id)}}
                    taskEdit={(e, id) =>{e.preventDefault(); taskModalToggler(item.id, item.title, item.description, null, defultDeadlineDate, taskCategoryIdExtractorForEdit);}}
                    
                />
            )
        }
    })
    const challangerModal = 
        <TaskModal  showModal={popupModalCondition} modalClose={(e, i) =>{closeTaskModalHandler()}}>
            <TaskModalForm 
                selectedId={newOrEditSelectedId} 
                selectedIdTitle={taskTitleForShow} 
                taskNameType={taskTitleForEdit}
                changeNameType={(event) =>{setTaskTitleForEdit(event.target.value)}}
                taskDescriptionType={taskDescriptionForEdit}
                changeDescriptionType={(event) =>{setTaskDescriptionForEdit(event.target.value)}}
                usersIdList={usersListId}
                realtimeSelectedUserIds={selectedUserIdsForAddOrEdit}
                changeSelectedUserIds={(event) => {setSelectedUserIdsForAddOrEdit(event); }}
                categoriesIdList={projectsListId}
                realtimeSelectedCategoryIds={selectedCategoryIdsForAddOrEdit}
                changeSelectedCategoryIds= {(event) => {setSelectedCategoryIdsForAddOrEdit(event); }}
                setDeadlineDate={choosedDeadlineDate}
                dateStarter= {todayDefaultDate}
                changeDeadlineDate={(event) => {setChoosedDeadlineDate(event); setModalClearerDate(false)}}
                clearDate={modalClearerDate}
                actionRemoveDeadlineDate={(e) =>{e.preventDefault(); setModalClearerDate(true)}}
                actionAddNew={(e, i) =>{e.preventDefault(); taskAddNewOrEditHandler()}}
                actionEdit={(e, i) =>{e.preventDefault(); taskAddNewOrEditHandler()}}
            />
        </TaskModal>
    ;
    let newTaskMaker = 
        <div className="card-new-task"  onClick={(e, i, j) =>{e.preventDefault(); taskModalToggler(0, null, null, null, null, null); setFormData({...formData, id:0})}}>
            <h3>+</h3>
            <h4>افزودن تسک جدید</h4>
        </div>
    ;
    if(props.selectedProfile !== null) {
        return (
            <div className="task-card-container">
                {challangerModal}
                {showAllUserTasks} 
                {newTaskMaker}
            </div>
        )
    } else {
        return (
            <div className="task-card-container">
                {challangerModal}
                {/* <div className="card-no-profile-selected">
                    <h3> <i className={"fa fa-address-book-o"}></i> </h3>
                    <h4>لطفا کاربری انتخاب کنید!</h4>
                </div> */}
                {showAllNoneUserTasks}
                {newTaskMaker}
            </div>
        )
    }
}

export default Tasks;