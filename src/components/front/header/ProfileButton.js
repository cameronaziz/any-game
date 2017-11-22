import React, { Component } from 'react';

class ProfileButton extends Component {

  render(){
    return(
      <li><a className="loginButton" href="/login" title="">{this.props.user.name}</a></li>
    );
  }
}

export default ProfileButton;
