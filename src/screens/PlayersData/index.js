import React, {useEffect, useState} from 'react';
import ScreenHeader from '../../components/common/ScreenHeader';
import {BgContainer} from '~styled-component/BackgroundContainer';
import Card from '../../components/common/Card';
import {Dropdown} from '../../components/common/Dropdown';
import {playersCollection, tournamentCollection} from '../../config/database';
import {isEmpty} from '../../utils';
import { ButtonWrapper } from './style';
import RoundBtn from '../../components/common/RoundButton';
import { COLORS } from '../../config/Colors';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TeamsWrapper } from '../ReviewPage/style';
import TeamCard from '../../components/common/TeamCard';
import { showToast } from '../../components/common/Toast';
import { ROUTE } from '../../navigation/routes';

const PlayersData = ({navigation, playersPerTeam = 6, route}) => {
  let {tournamentId, tournamentData} = route.params;

  const [staticPlayersList,setStaticPlayersList] = useState([])
  const [selectedTeam, setSelectedTeam] = useState('');
  const [playersList, setPlayersList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamDistribution, setTeamDistribution] = useState({});

  useEffect(() => {
    getPlayersList();
    getTeamList();
  }, []);

  const getPlayersList = () => {
    playersCollection.get().then(querySnapshot => {
      const playerDropdownOptions = [];

      querySnapshot.forEach(doc => {
        let {id, name: playerName} = doc.data();
        const option = {label: playerName, value: doc.id, key: doc.id};
        playerDropdownOptions.push(option);
        
      });

      setPlayersList(playerDropdownOptions);
      setStaticPlayersList(playerDropdownOptions)
    });
  };

  const getTeamList = () => {
    tournamentCollection
      .doc(tournamentId)
      .collection('teams')
      .get()
      .then(querySnapshot => {
        const teamDropdownOptions = [],
          tempTeamDist = {};
        querySnapshot.forEach(doc => {
          let {id, teamName, key} = doc.data();

          const option = {label: teamName, value: doc.id, key: key};
          teamDropdownOptions.push(option);
          if(doc.id) tempTeamDist[doc.id] = [];
        });
        setTeamList(teamDropdownOptions);
        setTeamDistribution(tempTeamDist)
      });
  };

  const equalPlayersPerTeam = ()=>{
    return Object.keys(teamDistribution).every(teamID => teamDistribution[teamID].length.toString() == tournamentData.playersPerTeam.toString())
  }

  const handleSubmit  = () =>{

    handleTeamDistribution();
    if(!equalPlayersPerTeam()) {
      showToast({
        type:'error',
        message1 : `${tournamentData.playersPerTeam} allowed per team.`,
        message2: 'You can change players per team on tournament data page.'
      })
      return;
    }

    let teamColRef = tournamentCollection.doc(tournamentId).collection('teams')
    const promises =[]
    for(const team in teamDistribution) {
      const payload = {players : teamDistribution[team]};
      const promise = teamColRef.doc(team).update({players:teamDistribution[team]})
      promises.push(promise);
    }

    Promise.all(promises).then(
      results => {
        showToast({
          type: 'success',
          message1: 'Players Added!',
          message2: 'Continue to add fixtures!',
        });
        navigation.navigate(ROUTE.REVIEW_DATA,{tournamentId,tournamentData})
      })
      .catch(error => {
        console.error('Error adding documents: ', error);
      });

  };


  const handleTeamDistribution = () => {
    let teamDist = {...teamDistribution};
    if(!isEmpty(selectedTeam)){
    teamDist[selectedTeam] = selectedPlayers;
    setTeamDistribution(teamDist);
    }
  };

  const filterOtherTeamPlayers = selectedTeamID => {
    if(!isEmpty(selectedTeamID)){let fullPlayersList = staticPlayersList,
      otherTeamPlayers = [];
    Object.keys(teamDistribution).forEach(teamId => {
      if (selectedTeamID !== teamId) {     
        otherTeamPlayers = [...otherTeamPlayers, ...teamDistribution[teamId]];

      }
    });
    let availablePlayers = fullPlayersList.filter(player =>  !otherTeamPlayers.includes(player.value));
    // console.log('FINAL PLAYERS',[...availablePlayers,...teamDistribution[selectedTeamID]])
    setPlayersList([...availablePlayers,...teamDistribution[selectedTeamID]]);}
  };

  const handleTeamChange = value => {
    
    let playersForSelectedTeam = teamDistribution[value] || [];
    setSelectedPlayers(playersForSelectedTeam);
    // filterOtherTeamPlayers(value);
  };

  return (
    <>
      <ScreenHeader title={'Players Data'} navigation={navigation} />
      <BgContainer>
        <Card
          width={'75%'}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 20,
            paddingTop: 25,
            zIndex: 9999,
          }}>
          <Dropdown
            width={'90%'}
            label={'Select Team'}
            value={selectedTeam}
            setValue={setSelectedTeam}
            onChangeValue={value => handleTeamChange(value)}
            maxHeight={350}
            placeholder="Select Team"
            style={{marginBottom: 40}}
            items={teamList}
            setItems={setTeamList}
          />
        </Card>

        <Card
          width={'75%'}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 20,
            paddingTop: 25,
            zIndex: 9,
          }}>
          <Dropdown
            width={'90%'}
            label={'Select Players'}
            disabled={isEmpty(selectedTeam)}
            style={{marginBottom: 40}}
            items={playersList}
            placeholder="Select players"
            setItems={setPlayersList}
            multiple={true}
            value={selectedPlayers}
            setValue={setSelectedPlayers}
            min={0}
            max={6}
            searchable={true}
            listMode="MODAL"
            theme="DARK"
            onClose={() => handleTeamDistribution()}
          />
        </Card>

        
        <ButtonWrapper>
                  <RoundBtn
                    onPress={values => {
                      handleSubmit(values);
                    }}
                    size={40}
                    type="submit"
                    color={COLORS.PURPLE}
                    icon={faArrowRight}
                    iconColor={COLORS.TEXT_1}
                  />
                </ButtonWrapper>
      </BgContainer>
    </>
  );
};

export default PlayersData;
