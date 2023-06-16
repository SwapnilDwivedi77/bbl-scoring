import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {PowerPLayWrapper} from '../../components/common/FixtureListItem/style';
import {COLORS} from '../../config/Colors';
import {faFire} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const Card = styled.View`
  background-color : ${COLORS.BG_DARK_4}
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  padding-left:5;
  padding-right:5;
  height: 130px;
  width:102%;
`;

const Container = styled.View`
  border: 1px solid red;
`;

const TeamContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TeamName = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 16px;
  line-height: 15px;
  letter-spacing: 1px;
  margin-bottom: 8px;
  color: ${COLORS.TEXT_1};
`;

const PlayerNames = styled.Text`
color:${COLORS.TEXT_1}
font-size: 14px;
line-height: 15px;
letter-spacing:1px;
overflow: hidden;`;

const VersusSign = styled.Image`
  margin-horizontal: 16px;
  width: 55px;
  height: 55px;
`;

const PowerPlaySign = styled.Image`
  width: 20px;
  height: 20px;
`;

export const RoundWrapper = styled.View`
flex-direction:row;
align-items:center;
margin:0 10px;
`


;
export const RoundText = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 15px;
  line-height: 15px;
  color: #8289a3;
`;

export const PlayerWrapper = styled.View`
align-items:center;
width:100%

`

const Matchup = ({item={}}) => {
  const {team1={}, team2={}, team1players=[], team2players=[],round,match} = item;
  return (
    <Card>
      <RoundWrapper>
        <RoundText>Round {round}, Match {match}</RoundText>
        <View style={{marginLeft: 'auto'}}>
        {item.isPowerPlay&&<PowerPlaySign
          source={require('../../assets/images/fire.png')}
          resizeMode="contain"
        />}
      </View>
      </RoundWrapper>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <TeamContainer>
          <TeamName style={{color: '#FE646F'}}>{team1.teamName}</TeamName>
          
          <PlayerWrapper>
          <PlayerNames>{`${team1players[0]?.name || 'TBC'}`}</PlayerNames>
          <PlayerNames>{`${team1players[1]?.name || 'TBC'}`}</PlayerNames>
          </PlayerWrapper>
          
        </TeamContainer>
        <VersusSign source={require('../../assets/images/versus.png')} />
        <TeamContainer>
          <TeamName style={{color: '#88E2FC'}}>{team2.teamName}</TeamName>
          <PlayerWrapper>
          <PlayerNames>{`${team2players[0]?.name || 'TBC'}`}</PlayerNames>
          <PlayerNames>{`${team2players[1]?.name || 'TBC'}`}</PlayerNames>
          </PlayerWrapper>
        </TeamContainer>
      </View>
      
    </Card>
  );
};

export default Matchup;
