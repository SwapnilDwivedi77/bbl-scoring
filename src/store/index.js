import { configureStore } from '@reduxjs/toolkit';

import tournamentDataReducer from '../screens/ReviewPage/tournamnetDataSlice'
import tournamentListReducer from '../screens/HomeScreen/tournamentListSlice'
import addedFixturesReducer from '../screens/ShowFixtures/fixturesSlice';
import playersStatsReducer from '../screens/PlayerRanking/playersStatSlice';
import loginStateSlice from '../screens/HomeScreen/loginStateSlice';
export const store = configureStore({
  reducer: {
    tournamentData : tournamentDataReducer,
    tournamentList : tournamentListReducer,
    addedFixtures  :addedFixturesReducer,
    playersStats:  playersStatsReducer,
    loginState : loginStateSlice,
  }
});
