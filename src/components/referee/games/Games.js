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

import {today} from '../../../lib/utilities';

const gameObj = {
  name: '',
  homeTeam: '',
  awayTeam: '',
  gameDateLocal: today()
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
    this.reloadGames = this.reloadGames.bind(this);
  }

  componentWillMount(){
    this.props.gameActions.loadGames(false);
    this.props.teamActions.loadTeams();
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

  createGame(event){
    console.log(this.props.teams)
    console.log(this.state.game)
  }



  render(){
    return(
      <div>
        <h1>Games Admin</h1>
        <button className="btn btn-outline-primary" data-toggle="modal" data-target="#modal">
          New Game
        </button>
        <Modal item={this.state.game}
               modalTitle={this.state.modalTitle}
               onChange={this.updateFormState}
               deleteButton={this.removeTeam}
               saveButton={this.createGame}
               modalForm={GameModalForm}

               uploadFile={this.uploadFile}
               sports={this.props.sports}
               teams={this.props.teams}
               />

      </div>
    );
  }


}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading,
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
