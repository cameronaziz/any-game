import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../../actions/users';
import * as ticketListingsActions from '../../../actions/ticketListings';


class PurchasePath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){

    // if(!selectedTicket) {
    //   this.props.history.push('/');
    // }
  }

  onChange(event){
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    this.setState({user: user});
  }

  render() {
    if(this.props.loading.ticketListings) {
      return (
        <div />
      );
    }
    return (
      <div>
        <h1>{this.props.cart.selectedTicket.gameSlug}</h1>
        <div className="col-md-8" style={{backgroundColor: '#eee'}}>
          <form>
            <div className="row">
              <div className="col-md-6">
                <label>Email</label>
                <input className="form-control"
                       name="email"
                       onChange={this.onChange}
                       value={this.state.user.email} />
              </div>
              <div className="col-md-6">
                <label>Phone</label>
                <input className="form-control"
                       name="phone"
                       onChange={this.onChange}
                       value={this.state.user.phone} />
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    cart: state.cart,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    ticketListingsActions: bindActionCreators(ticketListingsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PurchasePath);
