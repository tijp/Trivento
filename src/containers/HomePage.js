import React, { Component } from 'react';
import styled from 'styled-components';

import SearchContainer from '../containers/SearchContainer';
import UsersList from '../components/UsersList';
import UserDetailsContainer from '../containers/UserDetailsContainer';

const AppContainer = styled.div`
  height: calc(100% - 175px);
`;

class HomePage extends Component {
  render() {
    return (
      <AppContainer>
        <SearchContainer />
        <UsersList />
        <UserDetailsContainer />
      </AppContainer>
    );
  }
}

export default HomePage;
