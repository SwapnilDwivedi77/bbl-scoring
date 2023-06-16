import {View, ScrollView, RefreshControl, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {BgContainer} from '../../styled-component/BackgroundContainer';
import ScreenHeader from '../../components/common/ScreenHeader';
import FixtureListItem from '../../components/common/FixtureListItem';
import {FlatList} from 'react-native';
import {BtnContainer} from '../HomeScreen/style';
import RoundBtn from '../../components/common/RoundButton';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../config/Colors';
import {ROUTE} from '../../navigation/routes';
import {fetchFixturesList} from './fixturesSlice';
import {tournamentCollection} from '../../config/database';
import {showToast} from '../../components/common/Toast';
import LoaderScreen from '../../components/common/Loader';
import {isEmpty, sortFixtureList} from '../../utils';

const ShowFixtures = ({route, navigation}) => {

  const [matchesList,setMatchList] = useState({})

  const tournamentId = route.params?.tournamentId;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFixturesList(tournamentId))
  }, [])
  const fixturesList = useSelector(state => state.addedFixtures.list);

  
  
  


  const loading = useSelector(state => state.addedFixtures.loading);
  const error = useSelector(state => state.addedFixtures.error);
  const tournamentData = useSelector(state => state.tournamentData.data);

  
  console.log('FIXTURES',fixturesList.length)
  const onRefresh = () => {
    dispatch(fetchFixturesList(tournamentId));
  };
  const savePowerplayPlayers = async (team1Pair, team2Pair, matchId) => {
    await tournamentCollection
      .doc(tournamentData.id)
      .collection('fixtures')
      .doc(matchId)
      .update({team1players: team1Pair, team2players: team2Pair})
      .then(() => {
        showToast({
          type: 'success',
          message1: 'Players Updated for Powerplay!!',
          message2: 'Fight hard for that extra point 🔥🔥',
        });
        dispatch(fetchFixturesList(tournamentId));
      })
      .catch(error => console.log('Error', error));
  };
  return (
    <BgContainer>
      {loading && <LoaderScreen />}
      <ScreenHeader navigation={navigation} title={'Fixtures'} />
        {!isEmpty(fixturesList) &&
        
        <FlatList
          data={sortFixtureList(fixturesList)}
          renderItem={({item}) => (
           
            <FixtureListItem
              matchData={item}
              tournamentData={tournamentData}
              savePowerplayPlayers={savePowerplayPlayers}
            />
           
          )}
          keyExtractor={item => item.id}
        />
        }
          
    </BgContainer>
  );
};

export default ShowFixtures;
