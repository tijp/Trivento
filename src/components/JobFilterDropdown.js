import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { PowerSelect } from 'react-power-select';
import styled from 'styled-components';
import 'react-power-select/dist/react-power-select.css';

import GlobalStore from '../stores/GlobalStore';

const SelectContainer = styled.div`
  height: 40px;
  width: 35%;
  font-size: 16px;
  margin-top: 5px;
  margin-right: 10px;  
  float: right;
`;

const JobFilterDropdown = observer(class JobFilterDropdown extends Component {
  state = {};

  handleChange = ({ option }) => {
    this.setState({ selectedOption: option });
    GlobalStore.jobFilter = option;
  }

  render() {
    const { users } = GlobalStore;
    const uniqueJobs = [...new Set(users.map(user => user.job_role))];    
    return (
      <SelectContainer>
        <PowerSelect
          options={uniqueJobs}
          selected={this.state.selectedOption}
          onChange={this.handleChange}
          placeholder="Filter by job"
        />
      </SelectContainer>
    );
  }
})

export default JobFilterDropdown;
