import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack'; 
import {ROUTE} from '~navigation/routes';
import Home from '~screens/HomeScreen'
import TournamentData from '~screens/TournamentData'
import Splash from '~screens/Splash'
import TeamsData from '~screens/TeamsData';
import PlayersData from '~screens/PlayersData';
import ReviewData from '../screens/ReviewPage';
import AddFixtures from '../screens/AddFixtures';
import LoginScreen from '../screens/Login';
import ShowFixtures from '../screens/ShowFixtures';
import TournamentLandingPage from '../screens/TournamentLandingPage';
import PlayersRanking from '../screens/PlayerRanking';
import PointsTable from '../screens/PointsTable';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={({ route, navigation }) => ({
      headerShown: false,
      gestureEnabled: false,
      ...TransitionPresets.ModalTransition,
    })}>
      <Stack.Screen name={ROUTE.SPLASH} component={Splash} />
      <Stack.Screen name={ROUTE.HOME} component={Home} />
      <Stack.Screen name={ROUTE.TOURNAMENT_DATA} component={TournamentData} />
      <Stack.Screen name={ROUTE.TEAMS_DATA} component={TeamsData}/>
      <Stack.Screen name={ROUTE.PLAYERS_DATA} component={PlayersData} />
      <Stack.Screen name={ROUTE.REVIEW_DATA} component={ReviewData} />
      <Stack.Screen name={ROUTE.ADD_FIXTURES} component={AddFixtures} />
      <Stack.Screen name={ROUTE.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTE.SHOW_FIXTURES} component={ShowFixtures} />
      <Stack.Screen name={ROUTE.TOURNAMENT_LANDING_PAGE} component={TournamentLandingPage} />
      <Stack.Screen name={ROUTE.POINTS_TABLE} component={PointsTable} />
      <Stack.Screen name={ROUTE.PLAYERS_RANKING} component={PlayersRanking} />
    </Stack.Navigator>
  );
}

export default AppNavigator;