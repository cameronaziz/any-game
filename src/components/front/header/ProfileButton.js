import React, { Component } from 'react';

class ProfileButton extends Component {


  render(){
    return(
      <li>
        <a className="profile-btn-dropdown loginButton" href="#" title="">{this.props.user.name}</a>
        <div className="profile-btn-dropdown-content">
          <a href="#" onClick={this.props.logout}>Logout</a>
        </div>
      </li>
    );
  }
}

export default ProfileButton;
