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
import { compareTeams } from '../../utils';

const PointsTable = ({navigation, route}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const tournamentId = route.params.tournamentId;
  let tournamentData = useSelector(state => state.tournamentData.data);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    dispatch(fetchTournamentData(tournamentId));
  }, []);
  const onRefresh = () => {
    dispatch(fetchTournamentData(tournamentId));
  };
  const toggleRowExpansion = index => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };
  

  return (
    <BgContainer>
      <ScreenHeader navigation={navigation} title="Points Table" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <Container>
        <Header>
          <HeaderText flex={4}>Team</HeaderText>
          <HeaderText flex={1}>P</HeaderText>
          <HeaderText flex={1}>W</HeaderText>
          <HeaderText flex={1}>L</HeaderText>
          <HeaderText flex={1}>Pts</HeaderText>
        </Header>
        {[...tournamentData.teams].sort(compareTeams).map((team, index) => (
          <TouchableOpacity
            key={team.id}
            onPress={() => toggleRowExpansion(index)}>
            <Row expanded={expandedRow === index}>
              <TeamName flex={4}>{team.teamName}</TeamName>
              <MatchPlayed flex={1}>{team.matchesPlayed || 0}</MatchPlayed>
              <Won flex={1}>{team.win || 0}</Won>
              <Lost flex={1}>{team.loss || 0}</Lost>
              <Points flex={1}>{team.points || 0}</Points>
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
                        {team.bonusWin || 0}
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
                        {team.bonusLost || 0}
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
                        {team.powerPlayWin || 0}
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
                        {team.powerPlayBonusWin || 0}
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
                        {team.powerPlayBonusLost || 0}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </Container>
      </ScrollView>
    </BgContainer>
  );
};

export default PointsTable;
