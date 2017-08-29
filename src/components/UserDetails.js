import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import MobxReactForm from 'mobx-react-form';

import GlobalStore from '../stores/GlobalStore';
import Input from './SimpleInput';

const DetailsContainer = styled.div`
  height: calc(100% - 165px);
  width: 65%;
  margin-left: 35%;
  float: left;
  background-color: #FEFDFD;
  position: absolute;
  top: 165px;
  overflow-x: hidden;
  overflow-y: auto;

  @media screen and (max-width: 950px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: static;
  }
`;

const GradientHeader = styled.div`
  height: 300px;
  padding: 40px;
  background: #FF5F6D;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #FF5F6D, #ffb870);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #FF5F6D, #ffb870); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const ProfilePicture = styled.img`
  width: 150px;
  border-radius: 50%;
  border: 2px solid white;
  display: block;
  margin: auto;
`;

const Name = styled.h2`
  text-align: center;
  color: white;
`;

const Button = styled.button`
  background-color: ghostwhite;
  padding: 15px 50px;
  border-radius: 45px;
  border: 0.1px solid black;
  display: block;
  margin: 30px auto 30px;
  font-weight: bold;

  @media screen and (max-width: 600px) {
    padding: 15px 20px;
  }
`;

const CancelButton = Button.extend`
  background-color: #d9534f;
  display: inline;
  margin: 20px;
  color: white;
`;

const SaveButton = Button.extend`
  background-color: #449d44;
  display: inline;
  margin: 20px;
  color: white;  
`;

const Table = styled.table`
  width: 600px;
  margin: auto;
  padding: 20px;
  margin-top: 50px;
  font-size: 18px;

  @media screen and (max-width: 600px) {
    width: 400px;
  }
`;

const TableCell = styled.td`
  padding: 20px;
  border-bottom: 1px solid #ddd;
  color: #4d4d4d;

  @media screen and (max-width: 600px) {
    padding: 15px 10px;
  }
`;

let form;

const UserDetails = observer(class UserDetails extends Component {
  state = { isEditing: false };

  changeEditState = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }))
  }

  saveChanges = () => {
    const { selectedUser, users } = GlobalStore;    
    const findUser = (user) => user.id === selectedUser.id;
    const userIndex = users.findIndex(findUser);

    const first_name = form.$('first_name').value;
    const last_name = form.$('last_name').value;
    const gender = form.$('gender').value;
    const email = form.$('email').value;
    const address = form.$('address').value;
    const job_role = form.$('job_role').value;
    users[userIndex] = {...users[userIndex], first_name, last_name, gender, email, address, job_role};
    GlobalStore.selectedUser = users.find(findUser);
    this.changeEditState();
  }

  renderDetailsTable() {
    const { selectedUser } = GlobalStore;
    const { gender, email, address, job_role } = selectedUser;
    return (
      <Table>
        <tbody>
          <tr>
            <TableCell>Gender:</TableCell>
            <TableCell>{gender}</TableCell>
          </tr>
          <tr>
            <TableCell>Email:</TableCell>
            <TableCell>{email}</TableCell>
          </tr>
          <tr>
            <TableCell >Address:</TableCell>
            <TableCell>{address}</TableCell>
          </tr>
          <tr>
            <TableCell>Job:</TableCell>
            <TableCell>{job_role}</TableCell>
          </tr>
        </tbody>
      </Table>
    );
  }

  renderForm() {
    const fields = [{
      name: 'first_name',
      value: GlobalStore.selectedUser.first_name,  
    }, {
      name: 'last_name',
      value: GlobalStore.selectedUser.last_name,
    }, {
      name: 'gender',
      value: GlobalStore.selectedUser.gender,
    }, {
      name: 'email',
      value: GlobalStore.selectedUser.email,
    }, {
      name: 'address',
      value: GlobalStore.selectedUser.address,
    }, {
      name: 'job_role',
      value: GlobalStore.selectedUser.job_role,
    }];
    form = new MobxReactForm({ fields });

    return (
      <Table>
        <tbody>
          <tr>
            <TableCell>First name:</TableCell>
            <TableCell><Input field={form.$('first_name')} /></TableCell>            
          </tr>
          <tr>
            <TableCell>Last name:</TableCell>
            <TableCell><Input field={form.$('last_name')} /></TableCell>            
          </tr>
          <tr>
            <TableCell>Gender:</TableCell>
            <TableCell><Input field={form.$('gender')} /></TableCell>            
          </tr>
          <tr>
            <TableCell>Email:</TableCell>
            <TableCell><Input field={form.$('email')} /></TableCell>
          </tr>
          <tr>
            <TableCell>Address:</TableCell>
            <TableCell><Input field={form.$('address')} /></TableCell>            
          </tr>
          <tr>
            <TableCell>Job:</TableCell>
            <TableCell><Input field={form.$('job_role')} /></TableCell>
          </tr>
        </tbody>
      </Table>
    );
  }

  renderButtons = () => {
    const { isEditing } = this.state;    
    const editButton = <Button onClick={this.changeEditState}>EDIT</Button>;
    const cancelButton = <CancelButton onClick={this.changeEditState}>CANCEL</CancelButton>;
    const saveButton = <SaveButton onClick={this.saveChanges}>SAVE</SaveButton>;
    const CancelSaveContainer = styled.div`
      text-align: center;
    `;
    const cancelSaveButton = (
      <CancelSaveContainer>
        {cancelButton}
        {saveButton}
      </CancelSaveContainer>
    )
    return isEditing ? cancelSaveButton : editButton;
  }

  render() {
    const { isEditing } = this.state;
    const { selectedUser } = GlobalStore;
    const { id, first_name, last_name } = selectedUser;
    return (
      <DetailsContainer>
        <GradientHeader>
          <ProfilePicture src={require(`../assets/images/${id%10}.jpg`)} />
          <Name>{first_name} {last_name}</Name>
          { this.renderButtons() }
        </GradientHeader>
          
        { isEditing ? this.renderForm() : this.renderDetailsTable()}
        
      </DetailsContainer>
    );
  }
})

export default UserDetails;
