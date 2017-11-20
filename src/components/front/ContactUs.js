import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customerCommentsActions from '../../actions/CustomerComments';

let formObj = {
    name: '',
    email: '',
    comment: ''
}

class ContactUs extends Component {
  constructor(props) {
    super(props);
    let formObject = Object.assign({}, formObj);
    this.state = {
      form: formObject,
      message: ''
    }
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormChange(event){
    const field = event.target.name;
    let form = this.state.form;
    form[field] = event.target.value;
    this.setState({
      form: form
    });
  }

  onFormSubmit(){
    //Commenting out the action
    this.props.customerCommentsActions.submitCustomerComments(this.state.form);
    this.setState({
      form: formObj,
      message: 'Thank you for submitting!'
    });
  }


  render() {
    console.log(this.props.customerComments)
    return (
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center">Contact Us</h1>
        <h6 className="text-white text-center">{this.props.customerComments}</h6>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text"
                   className="form-control"
                   name="name"
                   value={this.state.form.name}
                   onChange={this.onFormChange} />
            <label>Email</label>
            <input type="email"
                   className="form-control"
                   name="email"
                   value={this.state.form.email}
                   onChange={this.onFormChange} />
            <label>Comments</label>
            <textarea className="form-control"
                      name="comment"
                      value={this.state.form.comment}
                      onChange={this.onFormChange} /><br/>
            <button type="button"
                    className="btn btn-warning"
                    onClick={this.onFormSubmit} >Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    customerComments: state.customerComments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    customerCommentsActions: bindActionCreators(customerCommentsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
