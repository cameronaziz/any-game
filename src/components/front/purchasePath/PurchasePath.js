import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import accounting from 'accounting';

import { formatDate } from '../../../lib/utilities';

import PurchaseForm from './PurchaseForm';

import * as userActions from '../../../actions/users';
import * as ticketListingsActions from '../../../actions/ticketListings';

class PurchasePath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    this.setState({user: user});
  }

  render() {
    if(this.props.loading.ticketListings || Object.keys(this.props.user).length < 1 ) {
      return (
        <div />
      );
    }
    return (
      <div>
        <h1>{this.props.cart.selectedTicket.gameSlug}</h1>
        <h3>{formatDate(this.props.cart.selectedTicket.gameTime)}</h3>
        <br />
        <div className="row">
          <div className="col-md-8" style={{backgroundColor: '#eee'}}>
            <PurchaseForm onChange={this.onChange}
                          user={this.state.user} />
          </div>
          <div className="col-md-4">
            <h4>Price</h4>
            Listing Price {accounting.formatMoney(this.props.cart.selectedTicket.price)}<br/>
            Fees {accounting.formatMoney(10)}<br />
            Price per ticket {accounting.formatMoney(this.props.cart.selectedTicket.price + 10)}<br />
            ---------------------------<br />
            Total {accounting.formatMoney((this.props.cart.selectedTicket.price + 10))}
          </div>
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
