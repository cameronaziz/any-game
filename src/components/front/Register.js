import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/users';
import Error from '../common/Error';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.saveButton = this.saveButton.bind(this);
  }

  onChange(event){
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    this.setState({user: user});
  }

  saveButton(){
    this.props.userActions.createUser(this.state.user);
  }

  render() {
    if(Object.keys(this.props.user).length > 0) {
      this.props.history.push('/');
    }
    return (
      <div id="header-featured">
         <div id="banner-wrapper">
            <div id="banner" className="container">
               <h1>Create an <strong>Any Game Tickets</strong> account</h1>
               <br />
               <Error messages={this.props.messages}
                      name="register" />
               <form>
                   <div className="form-group">
                     <div className="col-md-4 offset-md-4">
                       <label>Full Name</label>
                       <input name="name"
                              type="text"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.name} />
                       <label>Email</label>
                       <input name="email"
                              type="text"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.email} />
                       <label>Password</label>
                       <input name="password"
                              type="password"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.password}/>
                     </div>
                 </div>
                 <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={this.saveButton}>Create</button>
               </form>
            </div>
         </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);
