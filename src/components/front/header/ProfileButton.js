import React, { Component } from 'react';

class ProfileButton extends Component {


  render(){
    return(
      <span>
        <li><a className="profile-btn-dropdown loginButton" href="#" title="">{this.props.user.name}</a></li>
        <li><a href="#" onClick={this.props.logout}>Logout</a></li>
      </span>
    );
  }
}

export default ProfileButton;
