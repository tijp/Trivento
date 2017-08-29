import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import GlobalStore from '../stores/GlobalStore';
import UserDetails from './UserDetails';

const Modal = styled.div`
  display: ${props => props.showModal ? 'block' : 'none'};
  position: fixed;
  bottom: 0;
  background-color: #fefefe;
  width: 100%;
  height: calc(100% - 120px);    
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.4s;
  animation-name: slideIn;
  animation-duration: 0.4s;
`;

const CloseButton = styled.span`
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  right: 0;
  padding-right: 10px;

  &hover &focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const UserDetailsModal = observer(class UserDetailsModal extends Component {
  closeModal() {
    GlobalStore.showModal = false;
  }

  render() {
    const { showModal } = GlobalStore;
    return (
      <Modal id="myModal" showModal={showModal}>
        <CloseButton onClick={this.closeModal}>&times;</CloseButton>
        <UserDetails />
      </Modal>
    );
  }
})

export default UserDetailsModal;
