import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../config/Colors';

const Card = styled.View`
  
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  flex-direction: row;
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
letter-spacing:1px;
  margin-bottom: 8px;
  color : ${COLORS.TEXT_1}
  le
`;

const PlayerNames = styled.Text`
color:${COLORS.TEXT_1}
font-size: 14px;
line-height: 15px;
letter-spacing:1px;`;

const VersusSign = styled.Image`
  margin-horizontal: 16px;
  width:45px;
  height:45px;
`;

const MatchupCard = ({ team1, team2,team1players,team2players }) => {
  return (
    <Card>
      <TeamContainer>
        <TeamName style={{color:'#FE646F'}}>{team1.teamName}</TeamName>
        <PlayerNames>{`${team1players && team1players[0]?.name || 'TBC'} & ${team1players && team1players[1]?.name || 'TBC'}`}</PlayerNames>
      </TeamContainer>
      <VersusSign source={require('../../../assets/images/versus.png')} />
      <TeamContainer>
        <TeamName style={{color:'#88E2FC'}}>{team2.teamName}</TeamName>
        <PlayerNames>{`${team2players && team2players[0]?.name || 'TBC'} & ${team2players && team2players[1]?.name || 'TBC'}`}</PlayerNames>
      </TeamContainer>
    </Card>
  );
};

export default MatchupCard;
