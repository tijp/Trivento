import React, { Component } from 'react';
import styled from 'styled-components';

import GlobalStore from '../stores/GlobalStore';

const SearchInput = styled.input`
  height: 35px;
  width: 55%;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  padding-left: 20px;
  margin: 5px;
  margin-left: 10px;
`;

class SearchBar extends Component {
  handleChange = (event) => {
    GlobalStore.nameFilter = event.target.value;
  }

  render() {
    return (
      <SearchInput type="text" placeholder="Search..." onChange={this.handleChange} />
    );
  }
}

export default SearchBar;
