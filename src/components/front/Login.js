import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import * as userActions from '../../actions/users';
import Error from '../common/Error';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(event) {
    if (event.key === 'Enter') {
      this.loginClick();
    }
  }

  onChange(event){
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    this.setState({user: user});
  }

  loginClick(){
    this.props.userActions.loginUser(this.state.user);
  }

  render() {
    const cookies = new Cookies();
    if(cookies.get('selectedTicket')) {
      this.props.history.push('/purchase');
    }

    if(Object.keys(this.props.user).length > 0) {
      this.props.history.push('/');
    }
    return (
      <div id="header-featured">
         <div id="banner-wrapper">
            <div id="banner" className="container">
               <h1>Login to <strong>Any Game Tickets</strong></h1>
               <br />
               <Error messages={this.props.messages}
                      name="login" />
               <form>
                   <div className="form-group">
                     <div className="col-md-4 offset-md-4">
                       <label>Email</label>
                       <input name="email"
                              type="text"
                              className="form-control"
                              onKeyPress={this.keyPress}
                              onChange={this.onChange}
                              value={this.state.email} />
                       <label>Password</label>
                       <input name="password"
                              type="password"
                              className="form-control"
                              onKeyPress={this.keyPress}
                              onChange={this.onChange}
                              value={this.state.password}/>
                     </div>
                 </div>
                 <button disabled={this.props.loading.user} type="button" className="btn btn-warning" data-dismiss="modal" onClick={this.loginClick}>Login</button>
               </form>
            </div>
         </div>
      </div>
    );
  }
}
//                 {{csrfToken}}


function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading,
    messages: state.messages,
    user: state.user,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
