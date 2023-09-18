import React, { useState, useEffect } from "react";
import axios from "axios";

import ProjectCard from '../../Component/UI-Elements/Project-Card/Project-Card';
import ProjectModal from '../../Component/Layout/Modals/Project-Modal/Project-Modal';
import ProjectModalForm from '../../Component/UI-Elements/Project-Modal-Form/Project-Modal-Form';

import './Projects.css';

const Projects =(props) => {
    const [ projectsExtractor, setProjectsExtractor ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ deleteSelectedId, setDeleteSelectedId ] = useState(null);
    const [ newOrEditSelectedId, setNewOrEditSelectedId ] = useState(null);
    const [ projectTitleForEdit, setProjectTitleForEdit ] = useState(null);
    const [ projectTitleForShow, setProjectTitleForShow ] = useState(null);
    const [ projectDescriptionForEdit, setProjectDescriptionForEdit ] = useState(null);
    const [ projectUserIdForEdit, setProjectUserIdForEdit ] = useState(null);
    const [ popupModalCondition, setPopupModalCondition ] = useState(false);
    const [ refresherAfterAddOrEdit, setRefresherAfterAddOrEdit ] = useState(false);
    const [ formData, setFormData ] = useState({
        id: 0,
        title: null,
        description: null,
        userId: null
    });

    useEffect(() =>{
        axios
        .get('https://localhost:7209/api/Category')
        .then((response) => {
            setProjectsExtractor(response.data)
            // console.log(projectsExtractor)
        })
        .catch((err) => {
            setError(true)
            console.log(error, err)
        })
    }, []);
    useEffect(() =>{
        axios
        .get('https://localhost:7209/api/Category')
        .then((response) => {
            setProjectsExtractor(response.data)
            // console.log(projectsExtractor)
        })
        .catch((err) => {
            setError(true)
            console.log(error, err)
        })
        if( refresherAfterAddOrEdit ) {setRefresherAfterAddOrEdit(false);}
    }, [refresherAfterAddOrEdit]);
    useEffect(() =>{
        setDeleteSelectedId(null);
    }, [deleteSelectedId]);

    useEffect(()=>{
        setFormData({...formData, id:newOrEditSelectedId})
    },[newOrEditSelectedId])
    useEffect(()=>{
        setFormData({...formData, title:projectTitleForEdit})
    },[projectTitleForEdit])
    useEffect(()=>{
        setFormData({...formData, description:projectDescriptionForEdit})
    },[projectDescriptionForEdit])
    useEffect(()=>{
        setFormData({...formData, userId:projectUserIdForEdit})
    },[projectUserIdForEdit])

    const projectDeleteHandler = (id) => {
        setDeleteSelectedId(id);
        if(window.confirm('آیا برای حذف مطمئن هستید؟')) { (async () => {
            const rex = await axios
            .delete(`https://localhost:7209/api/Category/${id}`)
            if (rex.status === 200) {alert(`پروژه با موفقیت حذف شد`)}
            else {alert(`حذف ناموفق بود!`)}
        })();
            
            // axios
            
            // // .then((response) => {
            // //     alert(`پروژه با آی دی ${id} باموفقیت حذف شد`)
            // // })
            // .catch((err) => {
            //     setError(true)
            //     console.log(error, err)
            // })
        }
        setRefresherAfterAddOrEdit(true);
        console.log(refresherAfterAddOrEdit);

    }
    const projectAddNewOrEditHandler = (id) => {
        if (formData.id === 0) {
            (async () => {
                const rex = await axios
                .post('https://localhost:7209/api/Category', formData)
                if (rex.status === 200) {alert(`پروژه با موفقیت ثبت شد`)}
                else {alert(`ثبت ناموفق بود!`)}
            })();
            // axios
            // .post('https://localhost:7209/api/Category', formData)
            // .then((response) => {
            //     // console.log(response)
            // })
            // .catch((err) => {
            //     setError(true)
            //     console.log(error, err)
            // })
            setPopupModalCondition(false);
            setRefresherAfterAddOrEdit(true);
            console.log(refresherAfterAddOrEdit);
            closeProjectModalHandler()
        }
        else {
            (async () => {
                const rex = await axios
                .put('https://localhost:7209/api/Category', formData)
                if (rex.status === 200) {alert(`پروژه با موفقیت ویرایش شد`)}
                else {alert(`ویرایش ناموفق بود!`)}
            })();
            // axios
            // .put('https://localhost:7209/api/Category', formData)
            // .then((response) => {
            //     console.log(response)
            // })
            // .catch((err) => {
            //     setError(true)
            //     console.log(error, err)
            // })
            setPopupModalCondition(false);
            setRefresherAfterAddOrEdit(true);
            console.log(refresherAfterAddOrEdit);
            closeProjectModalHandler()
        }
    }
    const projectModalToggler = (id, pName, pDescription, pUserId) => {
        setNewOrEditSelectedId(id);
        setProjectTitleForEdit(pName);
        setProjectTitleForShow(pName);
        setProjectDescriptionForEdit(pDescription);
        setProjectUserIdForEdit(pUserId);
        setPopupModalCondition(true);
        setRefresherAfterAddOrEdit(true);
        console.log(refresherAfterAddOrEdit);
        setFormData({
            id: id,
            title: pName,
            description: pDescription,
            userId: pUserId
        });
        console.log(formData)

    }
    const closeProjectModalHandler = () => {
        setNewOrEditSelectedId(0);
        setProjectTitleForEdit(null);
        setProjectTitleForShow(null);
        setProjectDescriptionForEdit(null);
        setProjectUserIdForEdit(null);
        setPopupModalCondition(false);
        setRefresherAfterAddOrEdit(true);
        console.log(refresherAfterAddOrEdit);
        setFormData({
            id: 0,
            title: null,
            description: null,
            userId: null
        });
        console.log(formData)
    }
    const profilesList = props.profileList.map((item) => {
        return (
            <option key={item.id} {...(item.id === projectUserIdForEdit ? {selected: 'true'} : {})} value={item.id} label={item.fullName}></option>
        )
    })
    const showAllProjects = projectsExtractor.map((item) => {
        return (
            <ProjectCard 
                key={item.id}
                projectTitle={item.title}
                projectDescription={item.description}
                projectPerson={item.creator.fullName}
                projectDelete={(e) =>{projectDeleteHandler(item.id)}}
                projectEdit={(e) =>{projectModalToggler(item.id, item.title, item.description, item.userId)}}
            />
        )
    })

    // debugger;         
    return (
        <div  className="project-card-container">
            <ProjectModal  showModal={popupModalCondition} modalClose={(e, i) =>{e.preventDefault(); closeProjectModalHandler()}}>
                <ProjectModalForm 
                selectedId={newOrEditSelectedId} 
                selectedIdTitle={projectTitleForShow} 
                listIds={profilesList}
                projectNameType={projectTitleForEdit}
                changeName={(event) =>{event.preventDefault(); setProjectTitleForEdit(event.currentTarget.value)}}
                projectDescriptionType={projectDescriptionForEdit}
                changeDescription={(event) =>{event.preventDefault(); setProjectDescriptionForEdit(event.currentTarget.value)}}
                changeSelectedId={(event) =>{event.preventDefault(); setProjectUserIdForEdit(event.currentTarget.value)}}
                actionAddNew={(e) =>{e.preventDefault(); projectAddNewOrEditHandler()}}
                actionEdit={(e) =>{e.preventDefault(); projectAddNewOrEditHandler()}}
                />
            </ProjectModal>
            {showAllProjects}
            <div
            className="card-new-project"
            onClick={
                (e, i, j) =>{
                    e.preventDefault();
                    projectModalToggler(0, null, null, null);
                    setFormData({
                        id: 0,
                        title: null,
                        description: null,
                        userId: null
                    })
                }}>
                <h3>+</h3>
                <h4>افزودن پروژه جدید</h4>
            </div>
        </div>
    )
}


export default Projects;