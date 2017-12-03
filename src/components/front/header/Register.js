import React, { Component } from 'react';

class Login extends Component {

  render(){
    let content = <li><a href="/register" title="">Register</a></li>;
    if(this.props.isLoggedIn) {
      content = <li/>;
    }
    return content;
  }
}

export default Login;
