import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';

import './App.css';

const AppContainer = styled.div`
  height: 100%;
`;

// Route that can only be accessed when the user is logged in.
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    window.localStorage.getItem('isAuthenticated') === 'true' ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  render() {
    return (
      <Router>
        <AppContainer>
          <Header />
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/home" component={HomePage} />
        </AppContainer>
      </Router>
    );
  }
}

export default App;
