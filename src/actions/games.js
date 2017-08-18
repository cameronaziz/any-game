import axios from 'axios';

import * as firebase from '../lib/firebase';
import { nextDay } from '../lib/utilities';
import * as actionTypes from './actionTypes';

import * as loadingActions from './loading';

const ref = firebase.db.ref('games');

//Utility
function sortGamesByDayAndDispatch(snapshot, dispatch, slug){
  let games = [];
  snapshot.forEach(function(child) {
    games.push(child.val());
  });
  dispatch(loadGamesSuccess(games));
}

function cleanUpGame(game) {
  game.shortTitle = game.short_title;
  delete game.short_title;

  game.datetimeLocal = game.datetime_local;
  delete game.datetime_local;

  game.datetimeUTC = game.datetime_utc;
  delete game.datetime_utc;

  game.performers.map((team) => {
    if(team.home_team) {
      team.homeTeam = true;
      delete team.home_team;
    } else {
      team.homeTeam = false;
      delete team.away_team;
    }

    team.imageAttribution = team.image_attribution;
    delete team.image_attribution;

    team.imageLicense = team.image_license;
    delete team.image_license;

    team.shortName = team.short_name;
    delete team.short_name;

    team.divisions.map((division) => {
      division.displayName = division.display_name;
      delete division.display_name;

      division.displayType = division.display_type;
      delete division.display_type;

      division.divisionLevel = division.division_level;
      delete division.division_level;

      division.taxonomyId = division.taxonomy_id;
      delete division.taxonomy_id;
    });
  });

  game.stats.averagePrice = game.stats.average_price;
  delete game.stats.average_price;

  game.stats.highestPrice = game.stats.highest_price;
  delete game.stats.highest_price;

  game.stats.listingCount = game.stats.listing_count;
  delete game.stats.listing_count;

  game.stats.lowestPrice = game.stats.lowest_price;
  delete game.stats.lowest_price;

  game.stats.lowestPriceGoodDeals = game.stats.lowest_price_good_deals;
  delete game.stats.lowest_price_good_deals;

  game.venue.displayLocation = game.venue.display_location;
  delete game.venue.display_location;

  game.venue.extendedAddress = game.venue.extended_address;
  delete game.venue.extended_address;

  game.venue.postalCode = game.venue.postal_code;
  delete game.venue.postal_code;



  return game;
}

function removeTrash(game) {
  delete game.announce_date;
  delete game.created_at;
  delete game.date_tbd;
  delete game.datetime_tbd;
  delete game.is_open;
  delete game.time_tbd;
  delete game.url;
  delete game.visible_until_utc;

  let gameVenue = game.venue;
  delete gameVenue.url;
  gameVenue.name = gameVenue.name_v2;
  delete gameVenue.name_v2;
  delete gameVenue.has_upcoming_events;
  delete gameVenue.num_upcoming_events;

  game.performers.map((team) => {
    delete team.url;
    delete team.stats;
    delete team.primary;
    delete team.num_upcoming_events;
    delete team.has_upcoming_events;
    delete team.home_venue_id;
  });

  return game;
}

//Actions
export function loadGamesFromServer(settings, slug){
  let auth = {
    username: settings.clientId,
    password: settings.secret
  };
  let url = "https://api.seatgeek.com/2/events?per_page=200&";
  url = url + "performers.slug=" + slug;
  let requestData = {
    url: url,
    settings: {auth}
  };

  return function(dispatch) {
    dispatch(loadingActions.isLoading('games'));
    axios.get(requestData.url, requestData.settings).then((response) => {
      let data = response.data.events;
      ref.on('value', function(snapshot) {
        let storedGames = Object.values(snapshot.val());
        data.map((game) => {
          game = cleanUpGame(game);
          game = removeTrash(game);
          for(let i = 0; i < storedGames.length; i++) {
            if(game.id == storedGames[i].id) {
              game.stored = true;
            } else {
              game.stored = false;
            }
          }
        });
      });
      dispatch(loadGamesSuccess(data, 'remote'));
      dispatch(loadingActions.notLoading('games'));
    });
  };
}

export function loadGames(onlyFuture){
  return function(dispatch) {
    dispatch(loadingActions.isLoading('games'));
    if(onlyFuture) {
      let now = new Date();
      let startAt = now.toISOString();
      ref.orderByChild('datetimeLocal').startAt(startAt).on('value', function(snapshot) {
        sortGamesByDayAndDispatch(snapshot, dispatch);
        dispatch(loadingActions.notLoading('games'));
      });
    } else {
      ref.orderByChild('datetimeLocal').on('value', function(snapshot) {
        sortGamesByDayAndDispatch(snapshot, dispatch);
        dispatch(loadingActions.notLoading('games'));
      });
    }
  };
}

export function clearLoaded(){
  return function(dispatch) {
    let arr = [];
    dispatch(loadGamesSuccess(arr));
  };
}

export function loadGamesForTeamAfterDate(settings, prevResponseData){
  let authSettings = {
    auth: {
      username: settings.clientId,
      password: settings.secret
    }
  };
  let lastRecord = prevResponseData.gamesArray[prevResponseData.gamesArray.length - 1];
  let date = nextDay(lastRecord.datetime_utc.substring(0,10));
  let url = 'https://api.seatgeek.com/2/events?';
  let teams = lastRecord.performers;
  let slug = prevResponseData.team;
  url = url + 'performers.slug=' + slug;
  url = url + '&datetime_utc.gt=' + date;
  return function(dispatch) {
    axios.get(url, authSettings).then((response) => {
      let data = response.data.events;
      dispatch(addGamesSuccess(data));
    });
  };
}

export function saveGame(game){
  let postKey;
  return function(dispatch) {
    ref.orderByChild('id').equalTo(game.id).once('value', function(snapshot) {
      let exists = (snapshot.val() !== null);
      if(exists) {
        postKey = Object.keys(snapshot.val())[0];
      } else {
        postKey = ref.push().key;
      }
      firebase.db.ref('games/' + postKey).update(game, function(error) {
        if (error) {
          //dispatch(createGameSuccess(false));
        } else {
          window.alert('Loaded');
          //dispatch(createGameSuccess(true));
        }
      });
    });
  };
}

//To Reducers
export function loadGamesSuccess(games, source) {
  return {
    type: actionTypes.LOAD_GAMES_SUCCESS,
    games,
    source
  };
}

export function addGamesSuccess(games) {
  return {
    type: actionTypes.ADD_GAMES_SUCCESS,
    games
  };
}

export function createGameSuccess(status) {
  return {
    type: actionTypes.CREATE_GAME_SUCCESS,
    status
  };
}
