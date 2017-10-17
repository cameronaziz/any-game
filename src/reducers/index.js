import { combineReducers } from 'redux';
import settings from './settings';
import loading from './loading';
import teams from './teams';
import sports from './sports';
import users from './users';
import venues from './venues';
import games from './games';
import tickets from './tickets';
import seatingChart from './seatingCharts';

const rootReducer = combineReducers({
  loading,
  settings,
  teams,
  sports,
  users,
  venues,
  games,
  tickets,
  seatingChart
});

export default rootReducer;
