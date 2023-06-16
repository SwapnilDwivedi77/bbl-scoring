import {View, ScrollView} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {BgContainer} from '../../styled-component/BackgroundContainer';
import ScreenHeader from '../../components/common/ScreenHeader';
import Card from '../../components/common/Card';
import {Dropdown} from '../../components/common/Dropdown';
import {
  ButtonWrap,
  CardWrap,
  DropdownWrap,
  MatchHeading,
  RoundCount,
  RoundHeading,
  Wrapper,
} from './style';
import RoundBtn from '../../components/common/RoundButton';

import {
  faArrowRight,
  faPlus,
  faCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../config/Colors';
import {SubText} from '../ReviewPage/style';
import AddMatchModal from '../../components/common/AddMatchModal';
import {Text} from 'react-native';
import IconButton from '../../components/common/IconButton';
import MatchupCard from '../../components/common/MatchUpCard';
import {isEmpty} from '../../utils';
import {showToast} from '../../components/common/Toast';
import {ROUTE} from '../../navigation/routes';
import { tournamentCollection } from '../../config/database';

const AddFixtures = ({navigation,route}) => {
  const {tournamentId} = route.params || '';
  const [isVisible, setIsVisible] = useState({modal: false, matchNo: ''});
  const [roundCounter, setRoundCounter] = useState(1);
  const [fixturesList, setFixturesList] = useState([]);
  const [fullFixturesList, setFullFixturesList] = useState([]);
  const tournamentData = useSelector(state => state.tournamentData.data);
  const {totalHours, teams, playersPerTeam, roundsPerHours, totalCourts} =
    tournamentData;

  const handleFixturesAddition = matchData => {
    let matchesList = [...fixturesList];
    matchesList.push(matchData);
    setFixturesList(matchesList);
    setIsVisible(false);
  };

  const addKnockoutMatches = () => {
    const fixtureRef =  tournamentCollection.doc(tournamentId).collection('fixtures')
    let knockoutList = [],promises=[]
    const obj = {
      "isCompleted": false,
      "isKnockout": true,
      "match": '',
      "round": '',
      "team1": {
        "id": "",
        "teamName": "TBC"
      },
      "team1Points": "",
      "team1Score": "",
      "team2": {
        "id": "",
        "teamName": "TBC"
      },
      "team2Points": "",
      "team2Score": ""
    }
    // add semifinal matches

    for(let i=1;i<3;i++) {
      let matchData = {...obj};
      matchData.match = i,
      matchData.round = 'SEMI_FINAL';
      knockoutList.push(matchData);
    }

    // add final matches

    for(let i=1;i<3;i++) {
      let matchData = {...obj};
      matchData.match = i,
      matchData.round = 'FINAL';
      knockoutList.push(matchData);
    }

    knockoutList.forEach((match)=> {
      const payload = match;
      const promise = fixtureRef.add(payload);
      promises.push(promise);
  })
  Promise.all(promises)
      .then(results => {
        showToast({
          type: 'success',
          message1: 'Fixtures added.',
          message2:'Your tournament is ready to be published'
        }); 
        navigation.navigate(ROUTE.SHOW_FIXTURES, {tournamentId: tournamentId});     
      })
      .catch(error => {
        showToast({
          type: 'error',
          message1: 'Something went wrong!',
        });
      });
  }



  const handleAddFixturesData = () => {
    let tempList = [...fullFixturesList];
    const fullList = [...tempList, ...fixturesList]
    const fixtureRef =  tournamentCollection.doc(tournamentId).collection('fixtures')
    const promises = [];
    fixturesList.forEach((match)=> {
        const payload = match;
        const promise = fixtureRef.add(payload);
        promises.push(promise);
    })
    Promise.all(promises)
      .then(results => {   
        if (roundCounter < roundsPerHours * totalHours) {
          setRoundCounter(roundCounter + 1);
          showToast({
            type: 'success',
            message1: `Round${roundCounter} Added!`,
            message2: 'Continue to add next round!',
          });
        } else {
          if(tournamentData.hasKnockout) {
            addKnockoutMatches();
          }
        }
      })
      .catch(error => {
        console.error('Error adding documents: ', error);
      });


    setFullFixturesList(fullList);

    
    setFixturesList([]);
  };

  return (
    <>
      <ScreenHeader title={'Add Fixtures'} navigation={navigation} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <BgContainer>
          <Wrapper>
            <RoundHeading>
              Round <RoundCount>{roundCounter}</RoundCount> of{' '}
              {totalHours * roundsPerHours}
            </RoundHeading>
            <CardWrap>
              {Array.from({length: totalCourts}, (_, i) => i + 1).map(i => {
                const matchData =
                  fixturesList.filter(
                    fixture =>
                      fixture.match == i && fixture.round == roundCounter,
                  )[0] || [];
                return (
                  <Card
                    key={i}
                    style={{
                      marginTop: 20,
                      justifyContent: 'center',
                      paddingTop: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.BG_DARK_4,
                    }}>
                    <MatchHeading>
                      {'Match-' + i}
                      {matchData.isPowerPlay && '🔥'}
                    </MatchHeading>
                    {!isEmpty(matchData) ? (
                      <MatchupCard
                        team1={matchData.team1}
                        team1players={matchData.team1players}
                        team2={matchData.team2}
                        team2players={matchData.team2players}
                      />
                    ) : (
                      <ButtonWrap>
                        <RoundBtn
                          key={'button-' + i}
                          onPress={() =>
                            setIsVisible({modal: true, matchNo: i})
                          }
                          size={40}
                          color={COLORS.PURPLE}
                          icon={faPlus}
                          iconColor={COLORS.TEXT_1}
                        />
                      </ButtonWrap>
                    )}
                  </Card>
                );
              })}
            </CardWrap>

            <IconButton
              onPress={() => {
                handleAddFixturesData();
              }}
              text={
                roundCounter < roundsPerHours * totalHours ? 'Next' : 'Review'
              }
              size={140}
              style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}
              color={COLORS.PURPLE}
              icon={faCircleRight}
              iconColor={COLORS.TEXT_1}
            />
          </Wrapper>

          {isVisible.modal && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <AddMatchModal
                isVisible={isVisible.modal}
                setIsVisible={setIsVisible}
                teamData={teams}
                playersPerTeam={playersPerTeam}
                handleFixturesAddition={handleFixturesAddition}
                roundCounter={roundCounter}
                matchNumber={isVisible.matchNo}
              />
            </View>
          )}
        </BgContainer>
      </ScrollView>
    </>
  );
};

export default AddFixtures;
