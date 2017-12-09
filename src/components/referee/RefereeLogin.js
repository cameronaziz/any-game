import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/users';
import Error from '../common/Error';

class RefereeLogin extends Component {
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
    return (
      <div id="header-featured">
         <div id="banner-wrapper">
            <div id="banner" className="container">
               <br />
               <Error messages={this.props.messages}
                      name="login" />
               <form className="col-md-4 offset-md-4">
                 <div className="form-group">
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
                 <button disabled={this.props.loading.user} type="button" className="btn btn-primary btn-block" data-dismiss="modal" onClick={this.loginClick}>Login</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(RefereeLogin);
