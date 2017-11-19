import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '../../../actions/games';
import * as teamActions from '../../../actions/teams';

import RefereeLoading from '../RefereeLoading';
import GamesList from './GamesList';
import SelectTeam from '../common/SelectTeam';

class LoadGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: ''
    };
    this.props.teamActions.loadTeams();
    this.getGames = this.getGames.bind(this);
    this.createGame = this.createGame.bind(this);
    this.props.gameActions.clearLoaded();
  }

  getGames(event){
    if(event.target.value != 'no-slug'){
      this.setState({
        error: false
      });
      this.props.gameActions.loadGamesFromServer(this.props.settings.settingsArray.seatGeek, event.target.value);
    } else {
      this.setState({
        error: true,
        errorMessage: "No Team Slug"
      });
    }
  }

  createGame(game){
    this.props.gameActions.saveGame(game);
  }

  gamesList(){
    if(this.props.games.isFetching) {
      return <RefereeLoading heightOffset="20" />;
    } else if(this.props.games.length != 0 && this.props.games.gamesArray.length > 0) {
      return (<GamesList list={this.props.games.gamesArray}
                         setItem={this.createGame}
                         buttonText="Load Game" />
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

  render() {
    return (
      <div>
        <h1>Load Games Admin</h1>
        <div className="col-md-3">
          {this.state.error ? <div className="alert alert-warning" role="alert">{this.state.errorMessage}</div> : <div></div>}
          <SelectTeam getData={this.getGames}
                      teams={Object.values(this.props.teams)} />
          <br />
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(LoadGames);
