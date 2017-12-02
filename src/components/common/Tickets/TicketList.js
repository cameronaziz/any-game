import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TicketPreview from './TicketPreview';

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.previewTicket = this.previewTicket.bind(this);
    this.getChildObject = this.getChildObject.bind(this);
  }

  getChildObject(object, key){
    let objectArray = Object.entries(object);
    for(let i = 0; i < objectArray.length; i++) {
      if(objectArray[i][0] == key){
        return objectArray[i][1];
      }
    }
  }


  previewTicket(ticket){
    let ticketSection = this.getChildObject(this.props.sections, ticket[1].sectionKey);
    let game = this.getChildObject(this.props.games, ticket[1].gameKey);
    if(!ticket[1].isHidden) {
      return (
        <TicketPreview key={ticket[0]}
                       ticket={ticket}
                       section={ticketSection}
                       game={game} />
      );
    }
  }

  render() {
    if(Object.keys(this.props.tickets).length > 0 && Object.keys(this.props.games).length > 0){
      return (
        <div id="accordion" role="tablist" aria-multiselectable="true">
          {Object.entries(this.props.tickets).map(this.previewTicket)}
        </div>
      );
    } else {
      return(
        <div id="accordion" role="tablist" aria-multiselectable="true">
        </div>
      );
    }
  }
}

export default TicketList;
