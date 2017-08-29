import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../assets/images/logo.png';

const HeaderContainer = styled.div`
  background-color: white;
  height: 120px;
  padding: 20px;
`;

const LogoutButton = styled.button`
  float: right;
  border: 2px solid transparent;
  background: lightgrey;
  font-size: 16px;
  line-height: 25px;
  padding: 10px 0;
  border-radius: 3px;
  transition: 0.25s;
  width: 80px;
  text-align: center;

  &:hover {
    background: #2980B9;
    color: white;
    text-decoration: none;
  }
`;

class Header extends Component {
  logoutUser() {
    window.localStorage.setItem('isAuthenticated', false);
    window.location = '/';
  }

  render() {
    const isAuthenticated = window.localStorage.getItem('isAuthenticated') === 'true';
    console.log(isAuthenticated);
    return (
      <HeaderContainer>
        <img src={logo} alt="logo" />
        { isAuthenticated && <LogoutButton onClick={this.logoutUser}>Logout</LogoutButton> }
      </HeaderContainer>
    );
  }
}

export default Header;
