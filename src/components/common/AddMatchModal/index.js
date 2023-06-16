import {faCheck, faCircleXmark, faCross} from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';
import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {COLORS} from '../../../config/Colors';
import {Dropdown} from '../Dropdown';
import RoundBtn from '../RoundButton';
import {showToast} from '../Toast';
import {
  Container,
  DropdownContainer,
  PlayersContainer,
  PopupContent,
  PopupText,
  PowerplayChecboxWrapper,
  SubText,
  Title,
} from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const AddMatchModal = ({
  isVisible,
  setIsVisible,
  teamData,
  playersPerTeam,
  handleFixturesAddition,
  roundCounter,
  matchNumber,
  matchData,
  isEdit=false,
}) => {
  const [team1, setTeam1] = useState(isEdit ? matchData.team1.id :'');
  const [team2, setTeam2] = useState(isEdit ? matchData.team2.id :'');
  const [team1playerList, setTeam1PlayerList] = useState([]);
  const [team2playerList, setTeam2PlayerList] = useState([]);
  const [team1SelectedPlayers, setTeam1SelectedPlayers] = useState([]);
  const [team2SelectedPlayers, setTeam2SelectedPlayers] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [isPowerPlay, setIsPowerPlay] = useState(isEdit ? matchData.isPowerPlay : false);

  let emptySelectedPlayers = Array(parseInt(playersPerTeam)).fill(false);

  useEffect(() => {
    let teamDropdownOption = [];
    teamData.forEach(({id, teamName}) => {
      let teamOption = {};
      teamOption['value'] = id;
      teamOption['label'] = teamName;
      teamDropdownOption.push(teamOption);
    });
    setTeamList(teamDropdownOption);

    // checkbox

    let team1ChosePlayers = new Array(parseInt(playersPerTeam)).fill(false)
    let team2ChosePlayers = new Array(parseInt(playersPerTeam)).fill(false)

    

    if(isEdit) {    
      teamData.forEach(team=>{
        if(team.id == matchData.team1.id) {
          team.players.forEach((player,index) => {
            if(player.id == matchData.team1players[0].id) {
              team1ChosePlayers[index] = true
            }
            if(player.id == matchData.team1players[1].id) {
              team1ChosePlayers[index] = true
            }
          })
        }

        if(team.id == matchData.team2.id) {
          team.players.forEach((player,index) => {
            if(player.id == matchData.team2players[0].id) {
              team2ChosePlayers[index] = true
            }
            if(player.id == matchData.team2players[1].id) {
              team2ChosePlayers[index] = true
            }
          })
        }

        if (team.id === matchData.team1.id) setTeam1PlayerList(team.players);
        if (team.id === matchData.team2.id) setTeam2PlayerList(team.players);

        
      })
      
    }
    setTeam1SelectedPlayers(team1ChosePlayers)
    setTeam2SelectedPlayers(team2ChosePlayers)
    
  
  }, []);


  // useEffect(() => {
  //   setTeam1SelectedPlayers(new Array(playersPerTeam.length).fill(false));
  // }, [team1])

  // useEffect(() => {
  //   setTeam2SelectedPlayers(new Array(playersPerTeam.length).fill(false));
  // }, [team2])
  
  

  const checkDoublesPair = playerList => {
    if (isPowerPlay) return true;

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

  const handleTeam1Change =obj => {
    teamData.forEach(team => {
      if (team.id === obj.value && team.id != team2) setTeam1PlayerList(team.players);
    });
    setTeam1SelectedPlayers([...emptySelectedPlayers]);
  };

  const handleTeam2Change = obj => {
    teamData.forEach(team => {
      if (team.id === obj.value &&  team.id != team1) setTeam2PlayerList(team.players);
    });
    setTeam1SelectedPlayers([...emptySelectedPlayers]);
  };

  const getTeamData = id => {
    let selectedTeam = teamData.filter(team => team.id == id)[0];
    return {id: selectedTeam.id, teamName: selectedTeam.teamName};
  };
  const getPlayerData = (teamId, playersList, selectedList) => {
    let selectedPlayers = [];

    selectedList.forEach((selected, index) => {
      if (selected) {
        selectedPlayers.push(playersList[index]);
      }
    });
    return selectedPlayers;
  };

  const handleAddMatch = () => {
    if (!checkDoublesPair()) return;

    const matchData = {};

    matchData['round'] = roundCounter;
    matchData['match'] = matchNumber;
    matchData['team1'] = getTeamData(team1);
    matchData['team2'] = getTeamData(team2);
    matchData['team1Score'] = '';
    matchData['team2Score'] = '';
    matchData['team1Points'] = '';
    matchData['team2Points'] = '';
    matchData['isPowerPlay'] = isPowerPlay;
    matchData['isCompleted'] = false
    if(!isPowerPlay) {
      matchData['team1players'] = getPlayerData(
        team1,
        team1playerList,
        team1SelectedPlayers,
      );
      matchData['team2players'] = getPlayerData(
        team2,
        team2playerList,
        team2SelectedPlayers,
      );
    }
     handleFixturesAddition(matchData);
  };

  return (
    <>
      <Modal visible={isVisible} transparent animationType="slide">
        <Container>
          <PopupContent>
            <PowerplayChecboxWrapper>
              <BouncyCheckbox
                text={'Powerplay'}
                size={15}
                fillColor={COLORS.LIME}
                isChecked={isPowerPlay}
                textStyle={{
                  textDecorationLine: 'none',
                  color: COLORS.TEXT_1,
                }}             
                value={true}
                onPress={checked => {
                  setIsPowerPlay(checked);
                }}
              />
              <TouchableOpacity style={{marginLeft:'auto'}} onPress={()=> setIsVisible(false)}>
              <FontAwesomeIcon icon={faCircleXmark} color={COLORS.BG_DARK_3} size={20} />
              </TouchableOpacity>
             
            </PowerplayChecboxWrapper>

            <DropdownContainer>
              <View style={{flex: 0.5}}>
                <Dropdown
                  label="Team 1"
                  // onChangeValue={(value)=>handleTeam1Change(value)}
                  onSelectItem={(value)=>handleTeam1Change(value)}
                  value={team1}
                  setValue={setTeam1}
                  items={teamList.filter(team => team.value != team2)}
                  width={160}
                />
              </View>
              <View style={{flex: 0.5}}>
                <Dropdown
                  label="Team 2"
                  onSelectItem={(value)=>handleTeam2Change(value)}
                  value={team2}
                  setValue={setTeam2}
                  items={teamList.filter(team=> team.value !==team1)}
                  width={160}
                />
              </View>
            </DropdownContainer>

            {!isPowerPlay && (
              <>
                {<SubText>Choose doubles pair from each team</SubText>}

                <PlayersContainer>
                  <View style={{flex: 0.5, marginLeft: 10}}>
                    {team1playerList.map(({id, name}, index) => {
                      return (
                        <BouncyCheckbox
                          key={index}
                          text={name}
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
                  <View style={{flex: 0.5, marginLeft: 10}}>
                    {team2playerList.map(({id, name}, index) => {
                      
                      return (
                        <BouncyCheckbox
                          text={name}
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
              </>
            )}

            <RoundBtn
              onPress={() => handleAddMatch()}
              size={40}
              color={COLORS.PURPLE}
              icon={faCheck}
              iconColor={COLORS.TEXT_1}
              style={{marginLeft: 'auto'}}
            />
          </PopupContent>
        </Container>
        <Toast />
      </Modal>
    </>
  );
};

export default AddMatchModal;
