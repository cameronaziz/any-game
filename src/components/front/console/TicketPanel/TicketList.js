import React, { Component } from 'react';
import { connect } from 'react-redux';


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
    ticketListings: state.ticketListings
  };
}


export default connect(mapStateToProps)(TicketList);
