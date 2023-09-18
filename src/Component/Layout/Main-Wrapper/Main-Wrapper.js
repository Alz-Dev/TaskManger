import React, {useState, useEffect} from "react";
import { /*{BrowserRouter as Router ,}*/ Route, Routes/*{, Link, useLocation, useNavigate}*/ } from 'react-router-dom';
// import axios from "axios";

import Dashboard from '../../../Containers/Dashboard/Dashboard';
import Projects from '../../../Containers/Projects/Projects';
import Tasks from '../../../Containers/Tasks/Tasks';

// import managerPic from '../../../Pictures/manager.png';
import './Main-Wrapper.css';


const MainWrapper = (props) => {
    const [ sidebarToggle, setSidbarToggle ] = useState(true);
    // const [ error, setError ] = useState(false);
    // const currentLocatinOfBrowsing = useLocation();
    // let redirectAfterProfileSelect = useNavigate();

    useEffect( () => { 
        setSidbarToggle(props.sidebarToggler) 
    }, [props.sidebarToggler])  
    return (
        <div className={'content' + `${sidebarToggle ? '' : ' content-no-sidebar'}`} id="Main-Wrapper">
            <Routes>
                <Route index element={<Dashboard/>} />
                <Route path="/Projects" element={<Projects profileList={props.profileList}/>} />
                <Route path="/Tasks" element={<Tasks selectedProfile={props.selectedProfile} profileList={props.profileList}/>} /> 
            </Routes>
        </div>
    )
}

export default MainWrapper;