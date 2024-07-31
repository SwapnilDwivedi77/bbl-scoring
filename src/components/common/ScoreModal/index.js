import {View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useSelector, useDispatch} from 'react-redux';
import {
  Container,
  PopupContent,
  ScoreContainer,
  ButtonWrapper,
  PlayersContainer,
  ViewWrapper,
} from './style';
import MatchupCard from '../MatchUpCard';
import ScoreInput from './ScoreInput';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheck,
  faCircleXmark,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../../config/Colors';
import {Formik} from 'formik';
import RoundBtn from '../RoundButton';
import {getResultString, getTeamPoints} from '../../../utils/scoring';
import {ResultText} from '../FixtureListItem/style';
import {isEmpty} from '../../../utils';
import {showToast} from '../Toast';
import {playersCollection, tournamentCollection} from '../../../config/database';
import {fetchFixturesList} from '../../../screens/ShowFixtures/fixturesSlice';

const ScoreModal = ({
  isVisible,
  setIsVisible,
  matchData,
  setWinnersData,
  savePowerplayPlayers,
}) => {
  const {team1, team2, team1players, team2players, isPowerPlay} = matchData;
  const tournamentData = useSelector(state => state.tournamentData.data);
  const {teams, playersPerTeam, id: tournamentId,tournamentName} = tournamentData;

  const fixturesList = useSelector(state => state.addedFixtures.list);
  const powerPlayMatches = fixturesList.filter(match => match.isPowerPlay)

  const [matchScore, setMatchScore] = useState({team1Score: 0, team2Score: 0});
  let emptySelectedPlayers = Array(parseInt(playersPerTeam)).fill(false);
  const [team1SelectedPlayers, setTeam1SelectedPlayers] =
    useState(emptySelectedPlayers);
  const [team2SelectedPlayers, setTeam2SelectedPlayers] =
    useState(emptySelectedPlayers);

    const [powerPlayMatchCount,setPowerPlayMatchCount] = useState({})

  const team1playerList = teams.filter(team => team.id == matchData.team1.id)[0]
    .players;
  const team2playerList = teams.filter(team => team.id == matchData.team2.id)[0]
    .players;

  const dispatch = useDispatch();

  // const handleTeamStatsUpdate = async values => {
  //   let winningTeamId = '',
  //     losingTeamId;
  //   let winningTeamUpdate = {},
  //     winningScore = 0,
  //     losingScore = 0,
  //     losingTeamUpdate = {};

  //   let winningPlayers = [],
  //   losingPlayers= [],
  //   winP1Stat={},
  //   winP2Stat={},
  //   loseP1Stat={},
  //   loseP2Stat={}
  //   if (values.team1Score > values.team2Score) {
  //     winningTeamId = team1.id;
  //     losingTeamId = team2.id;

  //     // for player stats
  //     winP1Stat['player'] = team1players[0];
  //     winP2Stat['player'] = team1players[1];

  //     loseP1Stat['player'] = team2players[0];
  //     loseP2Stat['player'] = team2players[1];
  
  //     winningScore = values.team1Score;
  //     losingScore = values.team2Score;
  //   } else {
  //     winningTeamId = team2.id;
  //     losingTeamId = team1.id;

  //     // for player stats
  //     winP1Stat['player'] = team2players[0];
  //     winP2Stat['player'] = team2players[1];

  //     loseP1Stat['player'] = team1players[0];
  //     loseP2Stat['player'] = team1players[1];

  //     winningScore = values.team2Score;
  //     losingScore = values.team1Score;
  //   }

  //   winningTeamUpdate['matchesPlayed'] = firebase.firestore.FieldValue.increment(1);
  //   losingTeamUpdate['matchesPlayed'] =firebase.firestore.FieldValue.increment(1);

  //      // players Match played 
  //     winP1Stat['matchPlayed'] = firebase.firestore.FieldValue.increment(1);;
  //     winP2Stat['matchPlayed'] = firebase.firestore.FieldValue.increment(1);
  //     loseP1Stat['matchPlayed'] = firebase.firestore.FieldValue.increment(1);
  //     loseP2Stat['matchPlayed'] = firebase.firestore.FieldValue.increment(1);

  //   winningTeamUpdate['win'] = firebase.firestore.FieldValue.increment(1);
  //   losingTeamUpdate['loss'] = firebase.firestore.FieldValue.increment(1);
     
  //   // players win/lost

  //     winP1Stat['win'] = firebase.firestore.FieldValue.increment(1);;
  //     winP2Stat['win'] = firebase.firestore.FieldValue.increment(1);
  //     loseP1Stat['loss'] = firebase.firestore.FieldValue.increment(1);
  //     loseP2Stat['loss'] = firebase.firestore.FieldValue.increment(1);


  //   if (losingScore <= 12 && !isPowerPlay) {

  //     winningTeamUpdate['bonusWin'] =firebase.firestore.FieldValue.increment(1);
  //     winningTeamUpdate['points'] =firebase.firestore.FieldValue.increment(3);
  //     losingTeamUpdate['bonusLost'] =firebase.firestore.FieldValue.increment(1);

  //     //players bonus win without powerplay

  //     winP1Stat['bonusWin'] = firebase.firestore.FieldValue.increment(1);;
  //     winP2Stat['bonusWin'] = firebase.firestore.FieldValue.increment(1);

  //     winP1Stat['points'] = firebase.firestore.FieldValue.increment(3);;
  //     winP2Stat['points'] = firebase.firestore.FieldValue.increment(3);

  //     loseP1Stat['bonusLoss'] = firebase.firestore.FieldValue.increment(1);
  //     loseP2Stat['bonusLoss'] = firebase.firestore.FieldValue.increment(1);

  //   } else if (losingScore <= 12 && isPowerPlay) {

  //     winningTeamUpdate['powerPlayBonusWin'] = firebase.firestore.FieldValue.increment(1);
  //     winningTeamUpdate['points'] = firebase.firestore.FieldValue.increment(4);
  //     losingTeamUpdate['powerPlayBonusLost'] = firebase.firestore.FieldValue.increment(1);

  //     // player bonus powerplay wins/loss
  //     winP1Stat['powerPlayBonusWin'] = firebase.firestore.FieldValue.increment(1);;
  //     winP2Stat['powerPlayBonusWin'] = firebase.firestore.FieldValue.increment(1);

  //     winP1Stat['points'] = firebase.firestore.FieldValue.increment(4);;
  //     winP2Stat['points'] = firebase.firestore.FieldValue.increment(4);

  //     loseP1Stat['powerPlayBonusLost'] = firebase.firestore.FieldValue.increment(1);
  //     loseP2Stat['powerPlayBonusLost'] = firebase.firestore.FieldValue.increment(1);

  //   } else if (losingScore > 12 && isPowerPlay) {

  //     winningTeamUpdate['powerPlayWin'] = firebase.firestore.FieldValue.increment(1);
  //     winningTeamUpdate['points'] = firebase.firestore.FieldValue.increment(3);
  //     losingTeamUpdate['powerPlayLost'] = firebase.firestore.FieldValue.increment(1);
  //     losingTeamUpdate['points'] = firebase.firestore.FieldValue.increment(1);

  //     // players normal powerplay win

  //     // player bonus powerplay wins/loss
  //     winP1Stat['powerPlayWin'] = firebase.firestore.FieldValue.increment(1);;
  //     winP2Stat['powerPlayWin'] = firebase.firestore.FieldValue.increment(1);

  //     winP1Stat['points'] = firebase.firestore.FieldValue.increment(3);;
  //     winP2Stat['points'] = firebase.firestore.FieldValue.increment(3);
  //     loseP1Stat['points'] = firebase.firestore.FieldValue.increment(1);
  //     loseP2Stat['points'] = firebase.firestore.FieldValue.increment(1);

  //     loseP1Stat['powerPlayLost'] = firebase.firestore.FieldValue.increment(1);
  //     loseP2Stat['powerPlayLost'] = firebase.firestore.FieldValue.increment(1);
  //   }
  //   else {
  //     winningTeamUpdate['points'] = firebase.firestore.FieldValue.increment(2);
  //     losingTeamUpdate['points'] = firebase.firestore.FieldValue.increment(1);

  //     // player normal  wins/loss
     
  //     winP1Stat['points'] = firebase.firestore.FieldValue.increment(2);;
  //     winP2Stat['points'] = firebase.firestore.FieldValue.increment(2);
  //     loseP1Stat['points'] = firebase.firestore.FieldValue.increment(1);
  //     loseP2Stat['points'] = firebase.firestore.FieldValue.increment(1);
  //   }

  //     const getUpdateDataObject = (obj) => {
  //       const tournamentKey = tournamentName.replace(/\s+/g, '').toLowerCase();
  //       let updateData = {}
  //       Object.keys(obj).forEach(key=> {
  //         let objKey = `${tournamentKey}.${key}`
  //         updateData[objKey] = obj[key]
  //       })
  //       return updateData;
  //     }

  //   const winP1Promise =   await playersCollection.doc(winP1Stat.player.id).update(getUpdateDataObject(winP1Stat))
    
  //   const winP2Promise = await playersCollection.doc(winP2Stat.player.id).update(getUpdateDataObject(winP2Stat))
  //   const loseP1Promise = await playersCollection.doc(loseP1Stat.player.id).update(getUpdateDataObject(loseP1Stat))
  //   const loseP2Promise = await playersCollection.doc(loseP2Stat.player.id).update(getUpdateDataObject(loseP2Stat))
  //   // return [winPromise, lossPromise,winP1Promise,winP2Promise,loseP1Promise,loseP2Promise];
  //   return {winTeamStat : {id:winningTeamId,stat:winningTeamUpdate}, loseTeamState : {id:losingTeamId,stat:losingTeamUpdate},winP1Stat,winP2Stat,loseP1Stat,loseP2Stat}

  // };

  const handleSubmit = async values => {
    const result = getTeamPoints(
      parseInt(values.team1Score),
      parseInt(values.team2Score),
      isPowerPlay,
    );

    values.team1Score = parseInt(values.team1Score)
    values.team2Score = parseInt(values.team2Score)

    let winningTeamId = '',
      losingTeamId;
    let winningTeamUpdate = {},
      winningScore = 0,
      losingScore = 0,
      losingTeamUpdate = {};

    let winningPlayers = [],
    losingPlayers= [],
    winP1Stat={},
    winP2Stat={},
    loseP1Stat={},
    loseP2Stat={}

    console.log('RESULT',values)
    if (values.team1Score > values.team2Score) {
      winningTeamId = team1.id;
      losingTeamId = team2.id;

      // for player stats
      winP1Stat['player'] = team1players[0];
      winP2Stat['player'] = team1players[1];

      loseP1Stat['player'] = team2players[0];
      loseP2Stat['player'] = team2players[1];
  
      winningScore = values.team1Score;
      losingScore = values.team2Score;
    } else {
      winningTeamId = team2.id;
      losingTeamId = team1.id;

      // for player stats
      winP1Stat['player'] = team2players[0];
      winP2Stat['player'] = team2players[1];

      loseP1Stat['player'] = team1players[0];
      loseP2Stat['player'] = team1players[1];

      winningScore = values.team2Score;
      losingScore = values.team1Score;
    }

    winningTeamUpdate['matchesPlayed'] = firebase.firestore.FieldValue.increment(1);
    losingTeamUpdate['matchesPlayed'] =firebase.firestore.FieldValue.increment(1);

       // players Match played 
      winP1Stat['matchPlayed'] = firebase.firestore.FieldValue.increment(1);;
      winP2Stat['matchPlayed'] = firebase.firestore.FieldValue.increment(1);
      loseP1Stat['matchPlayed'] = firebase.firestore.FieldValue.increment(1);
      loseP2Stat['matchPlayed'] = firebase.firestore.FieldValue.increment(1);

    winningTeamUpdate['win'] = firebase.firestore.FieldValue.increment(1);
    losingTeamUpdate['loss'] = firebase.firestore.FieldValue.increment(1);
     
    // players win/lost

      winP1Stat['win'] = firebase.firestore.FieldValue.increment(1);;
      winP2Stat['win'] = firebase.firestore.FieldValue.increment(1);
      loseP1Stat['loss'] = firebase.firestore.FieldValue.increment(1);
      loseP2Stat['loss'] = firebase.firestore.FieldValue.increment(1);


    if (losingScore <= 12 && !isPowerPlay) {

      winningTeamUpdate['bonusWin'] =firebase.firestore.FieldValue.increment(1);
      winningTeamUpdate['points'] =firebase.firestore.FieldValue.increment(3);
      losingTeamUpdate['bonusLost'] =firebase.firestore.FieldValue.increment(1);

      //players bonus win without powerplay

      winP1Stat['bonusWin'] = firebase.firestore.FieldValue.increment(1);;
      winP2Stat['bonusWin'] = firebase.firestore.FieldValue.increment(1);

      winP1Stat['points'] = firebase.firestore.FieldValue.increment(3);;
      winP2Stat['points'] = firebase.firestore.FieldValue.increment(3);

      loseP1Stat['bonusLoss'] = firebase.firestore.FieldValue.increment(1);
      loseP2Stat['bonusLoss'] = firebase.firestore.FieldValue.increment(1);

    } else if (losingScore <= 12 && isPowerPlay) {

      winningTeamUpdate['powerPlayBonusWin'] = firebase.firestore.FieldValue.increment(1);
      winningTeamUpdate['points'] = firebase.firestore.FieldValue.increment(4);
      losingTeamUpdate['powerPlayBonusLost'] = firebase.firestore.FieldValue.increment(1);

      // player bonus powerplay wins/loss
      winP1Stat['powerPlayBonusWin'] = firebase.firestore.FieldValue.increment(1);;
      winP2Stat['powerPlayBonusWin'] = firebase.firestore.FieldValue.increment(1);

      winP1Stat['points'] = firebase.firestore.FieldValue.increment(4);;
      winP2Stat['points'] = firebase.firestore.FieldValue.increment(4);

      loseP1Stat['powerPlayBonusLost'] = firebase.firestore.FieldValue.increment(1);
      loseP2Stat['powerPlayBonusLost'] = firebase.firestore.FieldValue.increment(1);

    } else if (losingScore > 12 && isPowerPlay) {

      winningTeamUpdate['powerPlayWin'] = firebase.firestore.FieldValue.increment(1);
      winningTeamUpdate['points'] = firebase.firestore.FieldValue.increment(3);
      losingTeamUpdate['powerPlayLost'] = firebase.firestore.FieldValue.increment(1);
      losingTeamUpdate['points'] = firebase.firestore.FieldValue.increment(1);

      // players normal powerplay win

      // player bonus powerplay wins/loss
      winP1Stat['powerPlayWin'] = firebase.firestore.FieldValue.increment(1);;
      winP2Stat['powerPlayWin'] = firebase.firestore.FieldValue.increment(1);

      winP1Stat['points'] = firebase.firestore.FieldValue.increment(3);;
      winP2Stat['points'] = firebase.firestore.FieldValue.increment(3);
      loseP1Stat['points'] = firebase.firestore.FieldValue.increment(1);
      loseP2Stat['points'] = firebase.firestore.FieldValue.increment(1);

      loseP1Stat['powerPlayLost'] = firebase.firestore.FieldValue.increment(1);
      loseP2Stat['powerPlayLost'] = firebase.firestore.FieldValue.increment(1);
    }
    else {
      winningTeamUpdate['points'] = firebase.firestore.FieldValue.increment(2);
      losingTeamUpdate['points'] = firebase.firestore.FieldValue.increment(1);

      // player normal  wins/loss
     
      winP1Stat['points'] = firebase.firestore.FieldValue.increment(2);;
      winP2Stat['points'] = firebase.firestore.FieldValue.increment(2);
      loseP1Stat['points'] = firebase.firestore.FieldValue.increment(1);
      loseP2Stat['points'] = firebase.firestore.FieldValue.increment(1);
    }

      const getUpdateDataObject = (obj) => {
        const tournamentKey = tournamentName.replace(/\s+/g, '').toLowerCase();
        let updateData = {}
        Object.keys(obj).forEach(key=> {
          let objKey = `${tournamentKey}.${key}`
          updateData[objKey] = obj[key]
        })
        return updateData;
      }


    let matchRef = await tournamentCollection.doc(tournamentData.id).collection('fixtures').doc(matchData.id)
    let winningTeamRef = await tournamentCollection.doc(tournamentData.id).collection('teams').doc(winningTeamId)
    let losingTeamRef = await tournamentCollection.doc(tournamentData.id).collection('teams').doc(losingTeamId)
    const winP1Ref =   await playersCollection.doc(winP1Stat.player.id)   
    const winP2Ref = await playersCollection.doc(winP2Stat.player.id)
    const loseP1Ref = await playersCollection.doc(loseP1Stat.player.id)
    const loseP2Ref = await playersCollection.doc(loseP2Stat.player.id)

    console.log({winningTeamId,losingTeamId})

    firestore().runTransaction(async (t) => {
      
      // transaction to update points on match level
      t.update(matchRef,{
        team1Points: result.team1Points,
        team1Score: values.team1Score,
        team2Score: values.team2Score,
        team2Points: result.team2Points,
        isCompleted: true,
      })

      // transaction to update points on team level

      t.update(winningTeamRef,winningTeamUpdate)
      t.update(losingTeamRef,losingTeamUpdate)

      //transaction to update the players info

      t.update(winP1Ref,getUpdateDataObject(winP1Stat))
      t.update(winP2Ref,getUpdateDataObject(winP2Stat))

      t.update(loseP1Ref,getUpdateDataObject(loseP1Stat))
      t.update(loseP2Ref,getUpdateDataObject(loseP2Stat))

    }).then(()=>{
      showToast({
                  type: 'success',
                  message1: 'Scores Updated!!',
                });
                setWinnersData(result);
                setIsVisible(false);
    }).catch(err => {
      showToast({
        type: 'error',
        message1: 'Something went wrong',
      });
      console.log('FAT GYA',err)})
  };


  const getPowerPlayMatchesCount = () => {
    let obj={};

    powerPlayMatches.forEach(match => {
      if(match && match.team1players)  {
        match.team1players.forEach(p=> {
          if(!(p.id in obj)) obj[p.id]=0;
           else obj[p.id]++;
          
        })
      }
      if(match && match.team2players)  {
        match.team2players.forEach(p=> {
          if(!(p.id in obj)) obj[p.id]=0;
          else obj[p.id]++;
        })
      }
    })
    return obj;

  }

  useEffect(() => {
    setPowerPlayMatchCount(getPowerPlayMatchesCount())
  }, [fixturesList])
  
  const AddPowerPlayPlayers = () => {
    if (isPowerPlay && (isEmpty(team1players) || isEmpty(team2players))) {
      return true;
    }
    return false;
  };

  

  const checkDoublesPair = () => {
    let selectedPair1 = team1SelectedPlayers.filter(value => value).length;
    let selectedPair2 = team2SelectedPlayers.filter(value => value).length;

    if (selectedPair1 != 2 || selectedPair2 != 2) {
      showToast({
        type: 'error',
        message1: '😡 TUCHUK FELLOW!!',
        message2: 'Add two players for doubles',
      });
      return false;
    }
    return true;
  };

  const getPlayerData = (playersList, selectedList) => {
    let selectedPlayers = [];

    selectedList.forEach((selected, index) => {
      if (selected) {
        selectedPlayers.push(playersList[index]);
      }
    });
    return selectedPlayers;
  };

  const handlePowerPlayPlayersSubmit = async () => {
    if (!checkDoublesPair()) return;

    let team1Pair = getPlayerData(team1playerList, team1SelectedPlayers);
    let team2Pair = getPlayerData(team2playerList, team2SelectedPlayers);
    savePowerplayPlayers(team1Pair, team2Pair, matchData.id);
    setIsVisible(false);
  };

  return (
  // <>
  // <Modal visible={isVisible} transparent animationType="slide" onRequestClose={() => {
  //   console.log('CLOSING MODAL')
  //         setIsVisible(!isVisible);
  //       }}>
        
  //         <PopupContent>
  //           <TouchableOpacity
  //             style={{position: 'absolute', right: 5, top: 5,zIndex:999}}
  //             onPress={() => setIsVisible(false)}>
  //             <FontAwesomeIcon
  //               icon={faCircleXmark}
  //               color={COLORS.BG_DARK_3}
  //               size={25}
  //             />
  //           </TouchableOpacity>
  //           <MatchupCard
  //             team1={team1}
  //             team2={team2}
  //             team1players={team1players}
  //             team2players={team2players}
  //           />

  //           {!AddPowerPlayPlayers() ? (
  //             <Formik
  //               initialValues={matchScore}
  //               // validationSchema={FormSchema}
  //               onSubmit={values => {
  //                 handleSubmit(values);
  //               }}>
  //               {({
  //                 handleChange,
  //                 handleBlur,
  //                 handleSubmit,
  //                 values,
  //                 errors,
  //                 touched,
  //               }) => (
  //                 <>
  //                   <ScoreContainer>
  //                     <ScoreInput
  //                       key={'team1Score'}
  //                       id={'team1Score'}
  //                       onChangeText={handleChange('team1Score')}
  //                       keyboardType={'numeric'}
  //                       value={values.team1Score}
  //                       width={50}
  //                       height={50}
  //                     />
  //                     <FontAwesomeIcon
  //                       icon={faTrophy}
  //                       color={COLORS.YELLOW}
  //                       size={35}
  //                     />
  //                     <ScoreInput
  //                       key={'team2Score'}
  //                       id={'team2Score'}
  //                       keyboardType={'numeric'}
  //                       onChangeText={handleChange('team2Score')}
  //                       value={values.team2Score}
  //                       width={50}
  //                       height={50}
  //                     />
  //                   </ScoreContainer>
  //                   <ButtonWrapper>
  //                     <RoundBtn
  //                       onPress={values => {
  //                         handleSubmit(values);
  //                       }}
  //                       size={40}
  //                       type="submit"
  //                       color={COLORS.PURPLE}
  //                       icon={faCheck}
  //                       iconColor={COLORS.TEXT_1}
  //                     />
  //                   </ButtonWrapper>
  //                 </>
  //               )}
  //             </Formik>
  //           ) : (
  //             <>
  //               <PlayersContainer>
  //                 <View style={{flex: 0.5, marginLeft: 0}}>
  //                   {team1playerList.map(({id, name}, index) => {
  //                     return (
  //                       <BouncyCheckbox
  //                         key={index}
  //                         text={`${name} (${powerPlayMatchCount[id] || 0})`}
  //                         size={15}
  //                         fillColor={COLORS.LIME}
  //                         isChecked={team1SelectedPlayers[index]}
  //                         disableBuiltInState={true}
  //                         value={id}
  //                         textStyle={{
  //                           textDecorationLine: 'none',
  //                           color: COLORS.TEXT_1,
  //                         }}
  //                         onPress={checked => {
  //                           let checkList = [...team1SelectedPlayers];
  //                           checkList[index] = !checkList[index];
  //                           setTeam1SelectedPlayers(checkList);
  //                         }}
  //                       />
  //                     );
  //                   })}
  //                 </View>
  //                 <View style={{flex: 0.5, marginLeft: 17}}>
  //                   {team2playerList.map(({id, name}, index) => {
                      
  //                     return (
  //                       <BouncyCheckbox
  //                       text={`${name} (${powerPlayMatchCount[id] || 0})`}
  //                         key={id}
  //                         size={15}
  //                         fillColor={COLORS.LIME}
  //                         isChecked={team2SelectedPlayers[index] || false}
  //                         textStyle={{
  //                           textDecorationLine: 'none',
  //                           color: COLORS.TEXT_1,
  //                         }}
  //                         disableBuiltInState={true}
  //                         onPress={checked => {
  //                           let checkList = [...team2SelectedPlayers];
  //                           checkList[index] = !checkList[index];
  //                           setTeam2SelectedPlayers(checkList);
  //                         }}
  //                       />
  //                     );
  //                   })}
  //                 </View>
  //               </PlayersContainer>
  //               <ButtonWrapper>
  //                 <RoundBtn
  //                   onPress={() => {
  //                     handlePowerPlayPlayersSubmit();
  //                   }}
  //                   size={40}
  //                   type="submit"
  //                   color={COLORS.PURPLE}
  //                   icon={faCheck}
  //                   iconColor={COLORS.TEXT_1}
  //                 />
  //               </ButtonWrapper>
  //             </>
  //           )}
  //         </PopupContent>
  //       <Toast />
  //     </Modal>
  //     </>

  <>
  <Modal 
    visible={isVisible} 
    transparent 
    animationType="slide" 
  > 
     <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
      <PopupContent>
        <TouchableOpacity
          style={{position: 'absolute', right: 5, top: 5,zIndex:999}}
          onPress={() => setIsVisible(false)}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={COLORS.BG_DARK_3}
            size={25}
          />
        </TouchableOpacity>
        <MatchupCard
              team1={team1}
              team2={team2}
              team1players={team1players}
              team2players={team2players}
            />

            {!AddPowerPlayPlayers() ? (
              <Formik
                initialValues={matchScore}
                // validationSchema={FormSchema}
                onSubmit={values => {
                  handleSubmit(values);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                  <>
                    <ScoreContainer>
                        <ScoreInput
                        key={'team1Score'}
                        id={'team1Score'}
                        onChangeText={handleChange('team1Score')}
                        keyboardType={'numeric'}
                        value={values.team1Score}
                        width={50}
                        height={50}
                      />
                      <FontAwesomeIcon
                        icon={faTrophy}
                        color={COLORS.YELLOW}
                        size={35}
                      />
                      <ScoreInput
                        key={'team2Score'}
                        id={'team2Score'}
                        keyboardType={'numeric'}
                        onChangeText={handleChange('team2Score')}
                        value={values.team2Score}
                        width={50}
                        height={50}
                      />
                      
                     
                    </ScoreContainer>
                    <ButtonWrapper>
                      <RoundBtn
                        onPress={values => {
                          handleSubmit(values);
                        }}
                        size={40}
                        type="submit"
                        color={COLORS.PURPLE}
                        icon={faCheck}
                        iconColor={COLORS.TEXT_1}
                      />
                    </ButtonWrapper>
                  </>
                  </TouchableWithoutFeedback>
                )}
              </Formik>
            ) : (
              <>
                <PlayersContainer>
                  <View style={{flex: 0.5, marginLeft: 0}}>
                    {team1playerList.map(({id, name}, index) => {
                      return (
                        <BouncyCheckbox
                          key={index}
                          text={`${name} (${powerPlayMatchCount[id] || 0})`}
                          size={15}
                          fillColor={COLORS.LIME}
                          isChecked={team1SelectedPlayers[index]}
                          disableBuiltInState={true}
                          value={id}
                          textStyle={{
                            textDecorationLine: 'none',
                            color: COLORS.TEXT_1,
                          }}
                          onPress={checked => {
                            let checkList = [...team1SelectedPlayers];
                            checkList[index] = !checkList[index];
                            setTeam1SelectedPlayers(checkList);
                          }}
                        />
                      );
                    })}
                  </View>
                  <View style={{flex: 0.5, marginLeft: 17}}>
                    {team2playerList.map(({id, name}, index) => {
                      
                      return (
                        <BouncyCheckbox
                        text={`${name} (${powerPlayMatchCount[id] || 0})`}
                          key={id}
                          size={15}
                          fillColor={COLORS.LIME}
                          isChecked={team2SelectedPlayers[index] || false}
                          textStyle={{
                            textDecorationLine: 'none',
                            color: COLORS.TEXT_1,
                          }}
                          disableBuiltInState={true}
                          onPress={checked => {
                            let checkList = [...team2SelectedPlayers];
                            checkList[index] = !checkList[index];
                            setTeam2SelectedPlayers(checkList);
                          }}
                        />
                      );
                    })}
                  </View>
                </PlayersContainer>
                <ButtonWrapper>
                  <RoundBtn
                    onPress={() => {
                      handlePowerPlayPlayersSubmit();
                    }}
                    size={40}
                    type="submit"
                    color={COLORS.PURPLE}
                    icon={faCheck}
                    iconColor={COLORS.TEXT_1}
                  />
                </ButtonWrapper>
              </>
            )}
      </PopupContent>
    </TouchableWithoutFeedback>
    <Toast />
  </Modal>
</>

  );
};

export default ScoreModal;
