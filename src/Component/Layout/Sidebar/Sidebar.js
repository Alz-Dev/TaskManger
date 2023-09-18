import React, {useEffect, useState} from "react";
import { Link, useLocation } from 'react-router-dom';
// import { LinkContainer } from'react-router-bootstrap';
// import { Nav } from'react-bootstrap';

import './Sidebar.css'

const Sidebar = (props) => {
    useEffect( () => { 
        setIsToggle(props.toggle) 
    }, [props.toggle])
    const [isToggle, setIsToggle] = useState(true);
    const currentPage = useLocation();
    return (
    <div className={'sidebar' + `${isToggle ? '' : ' sidebar-off'}`} id="Main-Sidebar">
        <Link to="/" className={`${currentPage.pathname === '/' ? 'active-sidebar' : ''}`}><span className="fa fa-home"></span> داشبورد </Link>
        <Link to="/Projects" className={`${currentPage.pathname === '/Projects' ? 'active-sidebar' : ''}`}><span className="fa fa-file-text"></span> پروژه ها </Link>
        <Link to="/Tasks" className={`${currentPage.pathname === '/Tasks' ? 'active-sidebar' : ''}`}><span className="fa fa-tasks"></span> وظایف </Link>
    </div>
    )
}

export default Sidebar;