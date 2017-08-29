import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import MobxReactForm from 'mobx-react-form';

import Input from '../components/SimpleInput';
import users from '../assets/users.json';

const BackgroundContainer = styled.div`
  background-color: #3498DB;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const LoginForm = styled.form`
  margin: 20px auto;
  width: 80%;
  background-color: #FFF;
  padding: 40px;
  border-radius: 5px;
`;

const LoginTitle = styled.h1`
  text-align: center;
  color: #333;
  padding-bottom: 20px;
`;

const ErrorText = styled.h4`
  color: red;
  text-align: center;  
`;

const LoginButton = styled.input`
  border: 2px solid transparent;
  background: #3498DB;
  color: #ffffff;
  font-size: 16px;
  line-height: 25px;
  padding: 10px 0;
  text-decoration: none;
  text-shadow: none;
  border-radius: 3px;
  box-shadow: none;
  transition: 0.25s;
  display: block;
  width: 220px;
  margin: 0 auto;
  text-align: center;

  &:hover {
    background: #2980B9;
    color: white;
    text-decoration: none;
  }
`;

const fields = [{
  name: 'username',
  placeholder: 'Username',
}, {
  name: 'password',
  placeholder: 'Password',
}];

const form = new MobxReactForm({ fields });

const UserDetails = observer(class LoginPage extends Component {
  state = { showErrorText: false }

  handleSubmit = (e) => {
    e.preventDefault();
    const inputUsername = form.$('username').value;
    const inputPassword = form.$('password').value;
    const validate = user => user.username === inputUsername && user.password === inputPassword;

    users.forEach(user => validate(user) ? this.acceptLogin() : this.setState({showErrorText: true}));
  }

  acceptLogin() {
    // Saving auth state in localstorage because it's easy. I'm aware it is not very safe though ;)
    window.localStorage.setItem('isAuthenticated', true);
    window.location = '/home';
  }

  render() {
    const { showErrorText } = this.state;
    if (window.localStorage.getItem('isAuthenticated') === 'true') window.location = '/home';
    return (
      <BackgroundContainer>
        <LoginForm onSubmit={this.handleSubmit}>
          <LoginTitle>Login</LoginTitle>
          { showErrorText && <ErrorText>Invalid credentials!</ErrorText> }

          <Input field={form.$('username')} />
          <Input type="password" field={form.$('password')} />

          <LoginButton type="submit" value="Login" />
        </LoginForm>
      </BackgroundContainer>
    );
  }
})

export default UserDetails;
