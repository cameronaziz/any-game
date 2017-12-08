import { combineReducers } from 'redux';
import settings from './settings';
import loading from './loading';
import teams from './teams';
import sports from './sports';
import user from './users';
import venues from './venues';
import games from './games';
import ticketListings from './ticketListings';
import tickets from './tickets';
import seatingChart from './seatingCharts';
import seatingChartSections from './seatingChartSections';
import seatingChartSelections from './seatingChartSelections';
import messages from './messages';

const rootReducer = combineReducers({
  loading,
  settings,
  teams,
  sports,
  user,
  venues,
  games,
  ticketListings,
  tickets,
  seatingChart,
  seatingChartSections,
  seatingChartSelections,
  messages
});

export default rootReducer;
