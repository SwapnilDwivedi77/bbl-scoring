import {View, Text, TouchableOpacity, RefreshControl, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BgContainer} from '../../styled-component/BackgroundContainer';
import ScreenHeader from '../../components/common/ScreenHeader';
import {
  Container,
  Header,
  HeaderText,
  Lost,
  MatchPlayed,
  Points,
  Row,
  TeamName,
  Won,
} from './style';
import {COLORS} from '../../config/Colors';
import {useSelector, useDispatch} from 'react-redux';
import { fetchTournamentData } from '../ReviewPage/tournamnetDataSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { fetchPlayersStats } from './playersStatSlice';
import { compareTeams } from '../../utils';

const PlayersRanking = ({navigation, route}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const tournamentName = route.params.tournamentName;
  let playerStatsData = useSelector(state => state.playersStats.data);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [sortedList,setSortedList] = useState([]);

  useEffect(() => {
    const tournamentKey = tournamentName.replace(/\s+/g, '').toLowerCase();
    dispatch(fetchPlayersStats(tournamentKey))
  }, [])

  useEffect(() => {

    // console.log('PLAYER STATS',playerStatsData);
    let statsList=[]
    playerStatsData.forEach((player) => {
      let {
        matchPlayed,
        points,
        powerPlayBonusWin,
        powerPlayBonusLost,
        powerPlayLost,
        powerPlayWin,
      } = player;
    
      let powerPlayMatches =
        (parseInt(powerPlayBonusWin) || 0) +
        (parseInt(powerPlayBonusLost) || 0) +
        (parseInt(powerPlayLost) || 0) +
        (parseInt(powerPlayWin) || 0);
    
      let normalMatches = parseInt(matchPlayed || 0) - parseInt(powerPlayMatches || 0);
    
      let totalPoints = parseInt(normalMatches || 0) * 3 + parseInt(powerPlayMatches || 0) * 4;
      
      let strikeRate = ((points/totalPoints)*100).toFixed(1);

      let playerObj = {...player}
      playerObj['strikeRate'] = strikeRate

      statsList.push(playerObj);

    
    });
    
    statsList =  statsList.sort((a,b) => b.strikeRate - a.strikeRate)
    console.log(statsList);
    setSortedList(statsList)
  }, [playerStatsData])
  
  

  const onRefresh = () => {
    
  };
  const toggleRowExpansion = index => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  function comparePlayers(a, b) {
    // Sort by points in decreasing order
    if (a.points > b.points) {
      return -1;
    } else if (a.points < b.points) {
      return 1;
    } else {
      // If points are the same, sort by win in decreasing order
      if (a.win > b.win) {
        return -1;
      } else if (a.win < b.win) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  return (
    <BgContainer>
      <ScreenHeader navigation={navigation} title="Player Rankings" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <Container>
        <Header>
          <HeaderText flex={4}>Player</HeaderText>
          <HeaderText flex={1}>P</HeaderText>
          <HeaderText flex={1}>W</HeaderText>
          <HeaderText flex={1}>L</HeaderText>
          <HeaderText flex={1}>Pts</HeaderText>
          {/* <HeaderText flex={1}>Win %</HeaderText> */}
          <HeaderText flex={1}>Pts %</HeaderText>
        </Header>
        {sortedList.map((player, index) => {
          let {win,matchPlayed,loss,points,powerPlayWin,powerPlayLoss} = player;
          let winPercent = (parseInt(player.win)/parseInt(player.matchPlayed)*100).toFixed(0)
         
          if (isNaN(winPercent)) {
            winPercent = 0;
          }
          return(
          <TouchableOpacity
            key={index}
            onPress={() => toggleRowExpansion(index)}>
            <Row expanded={expandedRow === index}>
              <TeamName flex={4}>{player.player.name}</TeamName>
              <MatchPlayed flex={1}>{player.matchPlayed || 0}</MatchPlayed>
              <Won flex={1}>{player.win || 0}</Won>
              <Lost flex={1}>{player.loss || 0}</Lost>
              <Points flex={1}>{player.points || 0}</Points>
              {/* <Points flex={1}>{winPercent || 0}</Points> */}
              <Points flex={1}>{player.strikeRate || 0}</Points>
            </Row>
            {expandedRow === index && (
              <View style={{backgroundColor: '#353844', padding: 10}}>
                {expandedRow === index && (
                  <View
                    style={{
                      backgroundColor: COLORS.BG_DARK_3,
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <Text style={{color: COLORS.TEXT_1}}>Bonus Wins:</Text>
                      <Text style={{color: COLORS.LIME}}>
                        {player.bonusWin || 0}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <Text style={{color: COLORS.TEXT_1}}>Bonus Lost:</Text>
                      <Text style={{color: COLORS.ORANGE}}>
                        {player.bonusLost || 0}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 5,
                        
                      }}>
                      <Text style={{color: COLORS.TEXT_1,width:'80%'}}>Powerplay Wins</Text>
                      <Text style={{color: COLORS.LIGHT_BLUE}}>
                        {player.powerPlayWin || 0}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <Text style={{color: COLORS.TEXT_1}}>
                        Powerplay Bonus Wins:
                      </Text>
                      <Text style={{color: COLORS.PURPLE}}>
                        {player.powerPlayBonusWin || 0}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: COLORS.TEXT_1,width:'80%'}}>
                        Powerplay Bonus Lost:
                      </Text>
                      <Text style={{color: COLORS.YELLOW}}>
                        {player.powerPlayBonusLost || 0}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        )})}
      </Container>
      </ScrollView>
    </BgContainer>
  );
};

export default PlayersRanking;
