import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/users';

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
    return (
      <div id="header-featured">
         <div id="banner-wrapper">
            <div id="banner" className="container">
               <h1>Create an <strong>Any Game Tickets</strong> account</h1>
               <br />
               <form>
                   <div className="form-group">
                     <div className="col-md-4 offset-md-4">
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);
