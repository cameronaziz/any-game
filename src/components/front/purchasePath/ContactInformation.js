import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../../actions/users';

class ContactInformation extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
  }

  render() {
    const ticketListing =  this.props.ticketListings[0];
    return (
      <div>
        <h1>{ticketListing.gameSlug}</h1>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    ticketListings: state.ticketListings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactInformation);
