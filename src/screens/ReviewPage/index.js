import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BgContainer} from '../../styled-component/BackgroundContainer';
import ScreenHeader from '../../components/common/ScreenHeader';
import TeamCard from '../../components/common/TeamCard';
import {TeamsWrapper, SectionHeading, SubText} from './style';
import Card from '../../components/common/Card';
import RoundBtn from '../../components/common/RoundButton';
import {COLORS} from '../../config/Colors';

import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {ROUTE} from '../../navigation/routes';

import {fetchTournamentData, increment} from './tournamnetDataSlice';
import Loader from '../../components/common/Loader';
import { isEmpty } from '../../utils';

const ReviewData = ({navigation,route,}) => {
  const dispatch = useDispatch();
  const tournamentId = route.params.tournamentId;
  const mode= route.params.mode || 'EDIT'
  
  

  useEffect(() => {
    dispatch(fetchTournamentData(tournamentId));
  }, []);

  const tournamentData = useSelector(state => state.tournamentData.data);
  const loading = useSelector(state => state.tournamentData.loading);
  const error = useSelector(state => state.tournamentData.error);

  const {
    tournamentName,
    totalTeams,
    playersPerTeam,
    totalCourts,
    totalHours,
    roundsPerHours,
  } = tournamentData;

  return (
    <>
      <ScreenHeader title="Review" navigation={navigation} />
      <BgContainer>
        {loading && <Loader />}

        {!isEmpty(tournamentData)&&     
          <>
          <SectionHeading>{tournamentName}</SectionHeading>
        <TeamsWrapper>
          {!isEmpty(tournamentData)&& !isEmpty(tournamentData.teams) && tournamentData.teams.map((team, index) => {
            return <TeamCard teamData={team} key={index} width={'50%'} />;
          })}
        </TeamsWrapper>
        <SectionHeading>Playing Conditions</SectionHeading>
        <Card width={'40%'} style={{marginLeft: 20, marginTop: 20}}>
          <SubText>{totalCourts + ' Courts'}</SubText>
          <SubText>{totalHours + ' Hours'}</SubText>
          <SubText>{roundsPerHours + ' Rounds/hr'}</SubText>
        </Card>
        {(mode !== 'VIEW')&&<RoundBtn
          onPress={() => {
            navigation.navigate(ROUTE.ADD_FIXTURES,{tournamentId});
          }}
          size={40}
          style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}
          color={COLORS.PURPLE}
          icon={faArrowRight}
          iconColor={COLORS.TEXT_1}
        />}
        </>
        }
      </BgContainer>
    </>
  );
};

export default ReviewData;
