import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ticketLisingsActions from '../../actions/ticketListings';

import * as firebase from '../../lib/firebase';

let teamKey = '-KoU93bkph-iW1-3yo6B';

let ticketListing = {
  sectionKey: '-KxLfpbTZv8EzsxUh3Y8',
  sectionName: '101',
  gameKey: '-KxwHn6Fi1LLJKP1Ah0h',
  gameSlug: 'Denver Nuggets at Lakers',
  row: 1,
  startSeat: 1,
  endSeat: 4,
  isSold: false,
  price: 75
};

let teamTicketListing = {};
teamTicketListing[teamKey] = ticketListing;

let ticket1 = {
  row: 1,
  seat: 1,
  isSold: false
};

let ticket2 = {
  row: 1,
  seat: 2,
  isSold: false
};

let ticket3 = {
  row: 1,
  seat: 3,
  isSold: false
};

let ticket4 = {
  row: 1,
  seat: 4,
  isSold: false
};

const listingRef = firebase.db.ref('teamTicketListings/' + teamKey);

let tickets = [ticket1, ticket2, ticket3, ticket4];

class Sandbox extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // let listingKey = listingRef.push(ticketListing).key;
    // const ticketRef = firebase.db.ref('tickets/' + listingKey);
    // for(let i = 0; i < tickets.length; i++) {
    //   ticketRef.push(tickets[i]);
    // }
    this.props.ticketLisingsActions.getTicketListingsBySlug('los-angeles-lakers');
  }


  render() {
    return(
      <div>Hello</div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    ticketListings: state.ticketListings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketLisingsActions: bindActionCreators(ticketLisingsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Sandbox);
