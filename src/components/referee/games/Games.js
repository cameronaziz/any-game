import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '../../../actions/games';
import * as teamActions from '../../../actions/teams';

import RefereeLoading from '../RefereeLoading';
import GamesList from './GamesList';
import SelectTeam from '../common/SelectTeam';
import Modal from '../common/Modal';
import GameModalForm from './GameModalForm';

const gameObj = {
  shortTitle: '',
  name: ''
};

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
      game: gameObj,
      modalTitle: 'Create Game'
    };
    this.props.teamActions.loadTeams();
    this.filterGames = this.filterGames.bind(this);
    this.setGame = this.setGame.bind(this);
    this.createGame = this.createGame.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
    this.removeGame = this.removeGame.bind(this);
    this.reloadGames = this.reloadGames.bind(this);
    this.props.gameActions.loadGames(false);
  }

  updateFormState(event) {
    const field = event.target.name;
    let game = this.state.game;
    game[field] = event.target.value;
    this.setState({game: game});
  }

  setGame(game) {
    let gameSet = Object.assign({}, gameObj, game);
    this.setState({
      game: gameSet
    });
  }

  filterGames(event){
    if(event.target.value != 'no-slug'){
      this.setState({
        error: false
      });
    } else {
      this.setState({
        error: true,
        errorMessage: "No Team Slug"
      });
    }
  }

  reloadGames(event) {
    this.props.gameActions.loadGames(event.target.checked);
  }

  gamesList(){
    let loadingState  = this.props.loading;
    if(loadingState) {
      return <RefereeLoading heightOffset="20" />;
    } else if(this.props.games.length != 0 && this.props.games.gamesArray.length > 0) {
      return (<GamesList list={this.props.games.gamesArray}
                         setItem={this.setGame}
                         moreGames={this.moreGames}
                         isLocal />
      );
    } else if(this.props.games.team != undefined && this.props.games.gamesArray.length == 0) {
      return (
        <div className="col-md-4">
          <div className="alert alert-warning" role="alert">No games found.</div>
        </div>
      );
    } else {
      return (
        <div className="col-md-4">
          <div className="alert alert-info" role="alert">Please select a team.</div>
        </div>
      );
    }
  }

  createGame(game){
    this.props.gameActions.saveGame(game);
  }

  removeGame() {

  }

  render() {
    return (
      <div>
        <h1>Games Admin</h1>
        <div className="col-md-3">
          {this.state.error ? <div className="alert alert-warning" role="alert">{this.state.errorMessage}</div> : <div></div>}
        </div>
        <div className="row">
          <div className="col-md-3">
            <SelectTeam getGames={this.getGames}
                        teams={this.props.teams} />
          </div>
          <Modal item={this.state.game}
                 modalTitle={this.state.modalTitle}
                 onChange={this.updateFormState}
                 deleteButton={this.removeGame}
                 saveButton={this.createGame}
                 modalForm={GameModalForm} />

          <div className="col-md-3">
            <label className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" onChange={this.reloadGames} />
              <span className="custom-control-indicator"></span>
              <span className="custom-control-description">View only future games</span>
            </label>
          </div>
        </div>
        <br />
        {this.gamesList()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    games: state.games,
    settings: state.settings,
    teams: state.teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
    teamActions: bindActionCreators(teamActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Games);
