import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ticketActions from '../../../actions/tickets';
import * as teamActions from '../../../actions/teams';
import * as sportActions from '../../../actions/sports';

import Modal from '../common/Modal';
import RefereeLoading from '../RefereeLoading';
import TicketSection from './TicketSection';
import TicketModalForm from './TicketModalForm';

let ticketObj = {
  gameId: '',
  sport: '',
  name: ''
};

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: ticketObj,
      modalTitle: 'Add a new Ticket',
      error: false,
      errorMessage: ''
    };
    this.props.teamActions.loadTeams();
    this.updateFormState = this.updateFormState.bind(this);
    this.setTicket = this.setTicket.bind(this);
    this.createTicket = this.createTicket.bind(this);
    this.removeTicket = this.removeTicket.bind(this);
    this.clearTicket = this.clearTicket.bind(this);
  }

  componentWillMount() {
    this.props.sportActions.loadSports();
    //this.props.ticketActions.loadTickets();
  }

  updateFormState(event) {
    const field = event.target.name;
    let ticket = this.state.ticekt;
    ticket[field] = event.target.value;
    this.setState({ticket: ticket});
  }

  setTicket() {

  }

  createTicket() {

  }

  removeTicket() {

  }

  clearTicket() {

  }

  render() {
    return (
      <div>
        <h1>Ticket Admin</h1>
        <button className="btn btn-outline-primary" data-toggle="modal" data-target="#modal" onClick={this.clearTeam}>
          Add Ticket
        </button>
        <Modal item={this.state.ticket}
               modalTitle={this.state.modalTitle}
               onChange={this.updateFormState}
               deleteButton={this.removeTeam}
               saveButton={this.createTeam}
               modalForm={TicketModalForm}

               sports={this.props.sports}
               venues={this.props.venues}
               />
        <div className="col-md-3">
          {this.state.error ? <div className="alert alert-warning" role="alert">{this.state.errorMessage}</div> : <div></div>}
          <select name="sport"
                  className="form-control"
                  onChange={this.getTickets} >
            <option value="all">Pick Team</option>
            {this.props.teams.map((option) => {
              if(option.slug) {
                return <option key={option.name} value={option.slug}>{option.name}</option>;
              } else {
                return <option key={option.name} value="no-slug">{option.name}</option>;
              }
            })}
          </select>
        </div>
        <div className="col-md-6">
          <div id="accordion" role="tablist">
            <TicketSection />
            <div className="card">
              <div className="card-header" role="tab" id="headingTwo">
                <h5 className="mb-0">
                  <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Collapsible Group Item #2
                  </a>
                </h5>
              </div>
              <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" role="tab" id="headingThree">
                <h5 className="mb-0">
                  <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Collapsible Group Item #3
                  </a>
                </h5>
              </div>
              <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tickets: state.tickets,
    teams: state.teams,
    sports: state.sports
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sportActions: bindActionCreators(sportActions, dispatch),
    teamActions: bindActionCreators(teamActions, dispatch),
    ticketActions: bindActionCreators(ticketActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
