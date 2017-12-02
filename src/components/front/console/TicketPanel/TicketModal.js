import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ticketActions from '../../../../actions/tickets';
import * as gameActions from '../../../../actions/games';
import * as sportActions from '../../../../actions/sports';

import TicketForm from './TicketForm';

let ticketObj = {
  sport: '',
  team: ''
};

class TicketModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    this.props.sportActions.loadSports();
  }

  handleChange(event){
    switch(event.target.name) {
      case "sport":
        //this.props.teamActions.loadTeamsBySport(event.target.value);
        break;

      default:
        //console.log("default");
    }



  }

  render() {
    return(
      <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Add Ticket</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <TicketForm ticket={ticketObj}
                          sports={this.props.sports}
                          teams={this.props.teams}
                          onChange={this.handleChange}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    sports: state.sports,
    teams: state.teams,
    games: state.games,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sportActions: bindActionCreators(sportActions, dispatch),
    ticketActions: bindActionCreators(ticketActions, dispatch),
    gameActions: bindActionCreators(gameActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(TicketModal);
