import React, { Component } from 'react';
import { connect } from 'react-redux';

import TicketList from './TicketList';
import TicketModal from './TicketModal';

class TicketPanel extends Component {
  constructor(props) {
    super(props);
    this.clearSearchButton = this.clearSearchButton.bind(this);
  }

  clearSearchButton() {
    if(this.props.seatingChartSelections.length > 0) {
      return (
        <div className="clear-search">
          <button className="btn btn-secondary float-right" onClick={this.props.clearSearch}>Clear Search</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="console-right">
        {/* <TicketModal /> */}
        <div className="row">
          <div className="add-ticket">
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#modal" >Add Ticket</button>
          </div>
          &nbsp;
          {this.clearSearchButton()}
        </div>
        <div className="tickets">
          <TicketList />
        </div>
      </div>
  );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    seatingChartSelections: state.seatingChartSelections
  };
}

export default connect(mapStateToProps)(TicketPanel);
