import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router /*{, Route, Routes, Link}*/ } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import axios from 'axios';

// import Layout from './Component/Layout/Layout';
import Header from './Component/Layout/Header/Header';
import Sidebar from './Component/Layout/Sidebar/Sidebar';
import MainWrapper from './Component/Layout/Main-Wrapper/Main-Wrapper';
import SelectPersonModal from './Component/Layout/Modals/Select-Person-Modal/Select-Person-Modal';
import ProfileSingleItem from './Component/UI-Elements/Profile-Single-Item/Profile-Single-Item';


import './App.css';

const App =() => {
  const [ profilesListExtractor, setProfilesListExtractor ] = useState([])
  const [ selectedProfile, setSelectedProfile ] = useState(null);
  const [ selectedProfileName, setSelectedProfileName ] = useState('null');
  const [ popupModalCondition, setPopupModalCondition ] = useState(false);
  const [ error, setError ] = useState(false);
  const [showSidebar , setShowSidebar] = useState(true);

  useEffect(() => {
    axios
    .get('https://localhost:7209/api/User/GetUsers')
    .then((response) => {
        setProfilesListExtractor(response.data)
    })
    .catch((err) => {
        setError({ error: true })
        console.log(error, err)
    })
  } , []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }
  const toggleProfileSelectorModal = () => {
    setPopupModalCondition(true);
  }

  const selectProfileHandler = (id) => {
    setSelectedProfile(id);
    setPopupModalCondition(false);

  }
  const closeProfileSelectorModalHandler = () => {
    setPopupModalCondition(false);
  }

  const showProfilesForModalComponenet = profilesListExtractor.map((item) => {
    return (
        <ProfileSingleItem
        key={item.id}
        profileName={item.userName}
        profilePhoto={'managerPic'}
        isSelected={selectedProfile === item.id ? true : false}
        click={(event) => {event.preventDefault(); selectProfileHandler(item.id); setSelectedProfileName(item.fullName)}}
        />
    )
  })
  let profileNuller =         
  <div
    className={'profile-single-item' + `${ selectedProfile === null ? ' profile-single-item-selected' : '' }`}
    onClick={(event) =>{event.preventDefault(); selectProfileHandler(null); setSelectedProfileName('null')}}>
    <div className="profile-name" style={{marginTop:'25px'}}>
        Null
    </div>
  </div>
  return (
    <Router>
      <SelectPersonModal showModal={popupModalCondition} modalClose={() => closeProfileSelectorModalHandler()}>
          {showProfilesForModalComponenet}
          {profileNuller}
      </SelectPersonModal>
      <Header showProfileSelectorModal={() => toggleProfileSelectorModal()} click={()=>toggleSidebar()} selectedUserName={selectedProfileName}/>
      <Sidebar toggle={showSidebar}/>
      <MainWrapper sidebarToggler={showSidebar} selectedProfile={selectedProfile} profileList={profilesListExtractor}/>
    </Router>
  );
}

export default App;
