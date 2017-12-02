import React, { Component } from 'react';
import { connect } from 'react-redux';


import TicketPreview from './TicketPreview';

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.previewTicket = this.previewTicket.bind(this);
  }
  
  previewTicket(ticket) {
    if(!ticket[1].isHidden) {
      return (
        <TicketPreview key={ticket[0]}
                       ticket={ticket} />
      );
    }
  }

  render() {
    if(Object.keys(this.props.tickets).length > 0){
      return (
        <div id="accordion" role="tablist" aria-multiselectable="true">
          {Object.entries(this.props.tickets).map(this.previewTicket)}
        </div>
      );
    } else {
      return(
        <div id="accordion" role="tablist" aria-multiselectable="true">
          No Tickets
        </div>
      );
    }
  }
}
function mapStateToProps(state, ownProps) {
  return {
    tickets: state.tickets
  };
}


export default connect(mapStateToProps)(TicketList);
