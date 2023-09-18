import React, { useState, useEffect } from "react";

import "./Profile-Single-Item.css";
import managerPic from '../../../Pictures/manager.png';


const ProfileSingleItem = (props) => {
    useEffect( () => { 
        setSelectedItem(props.isSelected) 
    }, [props.isSelected])
    const [ selectedItem, setSelectedItem ] = useState(false);
    return (
        <div className={'profile-single-item' + `${ selectedItem ? ' profile-single-item-selected' : '' }`}  onClick={props.click}>
            <img className="profile-picture" src={managerPic} alt="Admin-Pic">
                
            </img>
            <div className="profile-name">
                {props.profileName}
            </div>
        </div>
    )

}

export default ProfileSingleItem;