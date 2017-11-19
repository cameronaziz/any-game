import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ticketActions from '../../../actions/tickets';
import * as teamActions from '../../../actions/teams';
import * as sportActions from '../../../actions/sports';
import * as gameActions from '../../../actions/games';

import Modal from '../common/Modal';
import RefereeLoading from '../RefereeLoading';
import TicketSection from './TicketSection';
import TicketModalForm from './TicketModalForm';

let ticketObj = {
  gameId: '',
  name: ''
};

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: ticketObj,
      modalTitle: 'Add a new Ticket',
      error: false,
      errorMessage: '',
      fieldStatus: {
        team: {
          select: 'Select a Sport first',
          disabled: true
        },
        game: {
          select: 'Select a Sport and Team first',
          disabled: true
        }
      }
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.setTicket = this.setTicket.bind(this);
    this.createTicket = this.createTicket.bind(this);
    this.removeTicket = this.removeTicket.bind(this);
    this.clearTicket = this.clearTicket.bind(this);
    this.onSportChange = this.onSportChange.bind(this);
    this.onTeamChange = this.onTeamChange.bind(this);
  }

  componentWillMount() {
    this.props.sportActions.loadSports();
    //this.props.ticketActions.loadTickets();
  }

  updateFormState(event) {
    const field = event.target.name;
    let ticket = this.state.ticket;
    ticket[field] = event.target.value;
    this.setState({ticket: ticket});
  }

  onSportChange(event) {
    let ticket = this.state.ticket;
    ticket['sport'] = event.target.value;
    this.setState({
      ticket: ticket,
      fieldStatus: {
        team: {
          select: 'Select a Team',
          disbaled: false
        },
        game: {
          select: 'Select a Team first',
          disabled: true
        }
      }
    });
    this.props.teamActions.loadTeamsBySport(this.state.ticket.sport);
  }

  onTeamChange(event) {
    let ticket = this.state.ticket;
    ticket['team'] = event.target.value;
    this.setState({
      ticket: ticket,
      fieldStatus: {
        team: {
          disabled: false
        },
        game: {
          select: 'Select a Game',
          disabled: false
        }
      }
    });
    this.props.gameActions.loadGamesByTeam(this.state.ticket.team);
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
        <div>
          <div className="modal fade" tabIndex="-1" id="modal" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="modalLabel">New Ticket</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="col-md-12">
                    <form>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Sport</label>
                            <select name="sport"
                                    className="form-control"
                                    onChange={this.onSportChange}
                                    value={this.state.sport} >
                              <option value="">Select a Sport</option>
                              {this.props.sports.map((option) => {
                                return <option key={option.name} value={option.name}>{option.name}</option>;
                              })}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label>Team</label>
                            <select name="team"
                                    className="form-control"
                                    onChange={this.onTeamChange}
                                    value={this.state.team}
                                    disabled={this.state.fieldStatus.team.disabled}>
                              <option value="">{this.state.fieldStatus.team.select}</option>
                              {this.props.teams.map((option) => {
                                return <option key={option.name} value={option.name}>{option.name}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Game</label>
                            <select name="team"
                                    className="form-control"
                                    onChange={this.updateFormState}
                                    value={this.state.game}
                                    disabled={this.state.fieldStatus.game.disabled}>
                              <option value="">{this.state.fieldStatus.game.select}</option>
                              {this.props.teams.map((option) => {
                                return <option key={option.name} value={option.name}>{option.name}</option>;
                              })}
                            </select>
                          </div>

                        </div>
                        <br />
                      </div>
                    </form>
                  </div>

                </div>
                <div className="modal-footer">

                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.createTicket}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    games: state.games,
    teams: state.teams,
    sports: state.sports
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sportActions: bindActionCreators(sportActions, dispatch),
    gameActions: bindActionCreators(gameActions, dispatch),
    teamActions: bindActionCreators(teamActions, dispatch),
    ticketActions: bindActionCreators(ticketActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
