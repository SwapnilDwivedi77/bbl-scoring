import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import React, { useState } from 'react';
import {
  MatchHeader,
  RoundText,
  RoundWrapper,
  TeamText,
  TeamWrapper,
  PowerPLayWrapper,
  PairWrapper,
  ScoreWrapper,
  ScoreText,
  ResultText,
  ResultWrapper,
  EditIconWrapper,
  VersusImg,
  MatchIconWrapper,
  ResultTextWrapper
} from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBolt, faFire, faPencil} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../../config/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddMatchModal from '../AddMatchModal';
import ScoreModal from '../ScoreModal';
import { isEmpty } from '../../../utils';
import { getResultString } from '../../../utils/scoring';
import { useSelector } from 'react-redux';


const TeamContainer = styled.View`
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;

`;
const PlayerNames = styled.Text`
color:${COLORS.TEXT_1}
font-size: 14px;
line-height: 15px;
letter-spacing:1px;`;

const VersusWrapper = styled.View`
flex:.2
`
const VersusSign = styled.Image`
  margin-horizontal: 16px;
  width: 45px;
  height: 45px;
`;

export const PlayerWrapper = styled.View`
flex:.4
align-items:center;
justify-content:center;
padding-top:10px;
`
const FixtureListItem = ({tournamentData,matchData,savePowerplayPlayers}) => {
  const [visibleMatchModal,setVisibleMatchModal] = useState(false)
  const [visibleScoreModal,setVisibleScoreModal] = useState(false);
  const loginData = useSelector(state => state.loginState.login);
  const [winnerData , setWinnersData] = useState({winningTeam:'',pointsWon : ''})
    const {id,isPowerPlay,match,round,team1,team1Points,team1Score,team1players=[],team2,team2Points,team2Score,team2players=[]} = matchData
    return (
    <>
      <MatchHeader key={id}>
        <RoundWrapper>
          <RoundText>
            Round {round}
          </RoundText>
          <RoundText>
          Match {match}
          </RoundText>
        </RoundWrapper>
        <TeamWrapper>
          
          <TeamText>{team1.teamName}</TeamText>
          <FontAwesomeIcon icon={faBolt} color={COLORS.YELLOW} />
          <TeamText>{team2.teamName}</TeamText>
        </TeamWrapper>
        {isPowerPlay && (
          <PowerPLayWrapper>
            <FontAwesomeIcon icon={faFire} color={COLORS.ORANGE} />
          </PowerPLayWrapper>
        )}
        {loginData && loginData.isLoggedIn && loginData.isAdmin && (
          <EditIconWrapper>
            <TouchableOpacity onPress={() => setVisibleScoreModal(true)}>
              <FontAwesomeIcon icon={faPencil} color={COLORS.TEXT_1} />
            </TouchableOpacity>
          </EditIconWrapper>
        )}

        
      </MatchHeader>
      
        <TeamContainer>
          <PlayerWrapper>
          <PlayerNames style={{color:'#FE646F'}}>{`${ team1players[0]?.name || 'TBC'}`}</PlayerNames>
          <PlayerNames style={{color:'#88E2FC'}}>{`${team1players[1]?.name || 'TBC'}`}</PlayerNames>
          </PlayerWrapper>
          <VersusWrapper>
          <VersusSign source={require('../../../assets/images/versus.png')} />
          </VersusWrapper>
          <PlayerWrapper>
          <PlayerNames style={{color:'#FE646F'}}>{`${team2players[0]?.name || 'TBC'}`}</PlayerNames>
          <PlayerNames style={{color:'#88E2FC'}}>{`${team2players[1]?.name || 'TBC'}`}</PlayerNames>
          </PlayerWrapper>
        </TeamContainer>
      
      <ResultWrapper>
      {!isEmpty(team1Points) && !isEmpty(team2Points) && (
          <ScoreWrapper>
          <ScoreText>{team1Score}</ScoreText>
          <ScoreText>-</ScoreText>
          <ScoreText>{team2Score}</ScoreText>
        </ScoreWrapper>
        )}
        {!isEmpty(team1Points) && !isEmpty(team2Points) && (
          <ScoreWrapper>
          <ScoreText>{team1Points}</ScoreText>
          <ScoreText>-</ScoreText>
          <ScoreText>{team2Points}</ScoreText>
        </ScoreWrapper>
        )}
        {!isEmpty(team1Points) && !isEmpty(team2Points) && (
          <ResultTextWrapper>
              <ResultText>{getResultString(team1Points,team1.teamName,team2Points,team2.teamName)}</ResultText>
          </ResultTextWrapper>

          
        )}


       
      </ResultWrapper>

      {visibleMatchModal && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AddMatchModal
            isVisible={visibleMatchModal}
            setIsVisible={setVisibleMatchModal}
            matchData={matchData}
            teamData={tournamentData.teams}
            playersPerTeam={tournamentData.playersPerTeam}
            // handleFixturesAddition={handleFixturesAddition}
            roundCounter={round}
            matchNumber={match}
            isEdit={true}
          />
        </View>
      )}

      {visibleScoreModal && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ScoreModal
            isVisible={visibleScoreModal}
            setIsVisible={setVisibleScoreModal}
            matchData={matchData}
            setWinnersData={setWinnersData}
            savePowerplayPlayers={savePowerplayPlayers}
          />
        </View>
      )}
    </>
  );
};

export default FixtureListItem;

