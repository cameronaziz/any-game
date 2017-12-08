import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ticketListingsActions from '../../../../actions/ticketListings';
import * as settingsActions from '../../../../actions/settings';

import TicketPreview from './TicketPreview';
import NoTickets from './NoTickets';

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.previewTicketListing = this.previewTicketListing.bind(this);
  }

  previewTicketListing(ticketListing) {
    if(!ticketListing.isHidden) {
      return (
        <TicketPreview key={ticketListing._key}
                       buyButtonClick={this.props.buyButtonClick}
                       ticket={ticketListing} />
      );
    }
  }

  render() {
    if(Object.keys(this.props.ticketListings).length > 0){
      return (
        <div id="accordion" role="tablist" aria-multiselectable="true">
          {this.props.ticketListings.map(this.previewTicketListing)}
        </div>
      );
    } else {
      return(
        <div id="accordion" role="tablist" aria-multiselectable="true">
          <NoTickets />
        </div>
      );
    }
  }
}
function mapStateToProps(state, ownProps) {
  return {
    ticketListings: state.ticketListings,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketListingsActions: bindActionCreators(ticketListingsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
