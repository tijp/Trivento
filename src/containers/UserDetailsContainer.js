import React, { Component } from 'react';

import UserDetails from '../components/UserDetails';
import UserDetailsModal from '../components/UserDetailsModal';

// Component to listen to screen resizes, so the correct view of the user details can be shown.
class UserDetailsContainer extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    const { width } = this.state;
    return width > 950 ? <UserDetails /> : <UserDetailsModal />;
  }
}

export default UserDetailsContainer;
