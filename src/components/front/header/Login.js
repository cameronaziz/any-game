import React, { Component } from 'react';
import ProfileButton from './ProfileButton';

class Login extends Component {

  render(){
    let content = <li><a className="loginButton" href="/login" title="">Login</a></li>;
    if(this.props.isLoggedIn) {
      content = <ProfileButton user={this.props.user} logout={this.props.logout}/>;
    }
    return content;
  }
}

export default Login;
