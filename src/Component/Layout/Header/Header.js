import React/*{, { useState, useEffect }}*/ from "react";
// import { createStore, provider } from "redux";
// import { connect } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'


// import SelectPersonModal from '../../../Component/Layout/Modals/Select-Person-Modal/Select-Person-Modal';
// import ProfileSingleItem from '../../../Component/UI-Elements/Profile-Single-Item/Profile-Single-Item';
// import profilesListExtractor from '../Main-Wrapper/Main-Wrapper';

import './Header.css';

const Header = (props) => {
  return (
        <header className="nav-bg" >
          <Navbar id="Main-Navigation">
            <Nav className="me-auto my-2 my-lg-0">
              <button onClick={props.click}>
                {/* <Nav.Link> */}
                  <i className="fa fa-bars" style={{ color: '#ffffff' }}></i>
                {/* </Nav.Link> */}
              </button>
              <LinkContainer to="/" style={{ color: '#ffffff' }}>
                <Nav.Link >
                    <i className="fa fa-home" style={{ color: '#ffffff' }}></i> میزکار
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              
              <button className="nav-link" onClick={props.showProfileSelectorModal}>
                {/* <Nav.Link> */}
                  <span>{props.selectedUserName}</span>
                  <i className="fa fa-user" style={{ color: '#ffffff' }}></i>
                {/* </Nav.Link> */}
              </button>
              {/* <LinkContainer to="/">
                <Nav.Link>

                    <i className="fa fa-user" style={{ color: '#ffffff' }}></i>
                </Nav.Link>
              </LinkContainer> */}
              <button className="nav-link" onClick={props.openSearchInput}>
                {/* <Nav.Link> */}
                  <i className="fa fa-search" style={{ color: '#ffffff' }}></i>
                {/* </Nav.Link> */}
              </button>
                {/* <LinkContainer to="/Search">
                <Nav.Link>
                    <i className="fa fa-search" style={{ color: '#ffffff' }}></i>
                </Nav.Link>
              </LinkContainer> */}
            </Nav>
          </Navbar>
        </header>
    )
}

export default Header;