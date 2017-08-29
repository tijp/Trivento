import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import users from '../assets/user_list.json';
import GlobalStore from '../stores/GlobalStore'
import UserListItem from './UserListItem';

GlobalStore.users = users;
GlobalStore.selectedUser = users[0];

const ListContainer = styled.ul`
  height: 100%;
  width: 35%;
  position: relative;
  padding: 0;
  left: 0;
  top: 0;
  list-style-type: none;
  overflow-y: scroll;

  @media screen and (max-width: 950px) {
    width: 100%;
  }
`;

const UsersList = observer(class UsersList extends Component {
  render() {
    const { nameFilter, jobFilter, users } = GlobalStore;
    const filterName = user => fullName(user).includes(nameFilter);
    const fullName = user => `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`;
    const filterJobRole = user => jobFilter !== undefined ? user.job_role.includes(jobFilter) : true;

    return (
      <ListContainer>
        {users
          .filter(user => filterName(user) && filterJobRole(user))
          .map(listValue => <UserListItem key={listValue.id} user={listValue} />)
        }
      </ListContainer>
    );
  }
})

export default UsersList;
