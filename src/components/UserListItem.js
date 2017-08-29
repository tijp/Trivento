import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import GlobalStore from '../stores/GlobalStore';

const ListItem = styled.li`
  padding: 20px;
  background-color: ${props => props.selected ? '#F7F7F7' : 'white'};
  border-bottom: 1px solid lightgrey;

  &:hover {
    background-color: #F7F7F7;
    cursor: pointer;
  }
`;

const ProfilePicture = styled.img`
  float: left;
  border-radius: 50%;
  width: 50px;
  margin: 0 15px 0 0;
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #E67C6A;
`;

const UserListItem = observer(class UserListItem extends Component {
  onClick = () => {
    GlobalStore.selectedUser = {...this.props.user};
    if (window.innerWidth < 950) GlobalStore.showModal = true;
  }

  render() {
    const { user } = this.props;
    const { selectedUser } = GlobalStore;
    const isSelected = user.id === selectedUser.id;
    return (
      <ListItem onClick={this.onClick} selected={isSelected}>
        <ProfilePicture src={require(`../assets/images/${user.id%10}.jpg`)} />
        <Name>{user.first_name} {user.last_name}</Name>
        <p>{user.job_role}</p>
      </ListItem>
    );
  }
})

export default UserListItem;
