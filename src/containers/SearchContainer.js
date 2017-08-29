import React, { Component } from 'react';

import SearchBar from '../components/SearchBar';
import JobFilterDropdown from '../components/JobFilterDropdown';

class SearchContainer extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <JobFilterDropdown />
      </div>
    );
  }
}

export default SearchContainer;
