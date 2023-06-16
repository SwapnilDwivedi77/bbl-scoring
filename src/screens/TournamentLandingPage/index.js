
import Lottie from 'lottie-react-native';
import {useSelector, useDispatch} from 'react-redux';
import React, { useEffect, useState } from 'react'
import { BgContainer } from '../../styled-component/BackgroundContainer'
import ScreenHeader from '../../components/common/ScreenHeader'
import { fetchTournamentData } from '../ReviewPage/tournamnetDataSlice';
import CardList from './Cardscroll';
import HomeButton from '../../components/common/HomeButton';
import { faList, faMagnifyingGlassChart, faMedal, faRankingStar, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Container, PodiumImage, Row, WinnerNameText, WinnerNameWrapper, WinnerSection } from './style';
import { ROUTE } from '../../navigation/routes';
import { fetchFixturesList, setFixtureList } from '../ShowFixtures/fixturesSlice';
import LoaderScreen from '../../components/common/Loader';
import {compareTeams, isEmpty, sortFixtureList} from '../../utils/index'
import { tournamentCollection } from '../../config/database';

const TournamentLandingPage = ({navigation,route}) => {
    const {tournamentName,id} = route.params.tournamentData
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const tournamentId = id;
    const fixturesList = useSelector(state => state.addedFixtures.list);
    let tournamentData = useSelector(state => state.tournamentData.data);
    const winnerTeam = !isEmpty(tournamentData) ?  [...tournamentData.teams].sort(compareTeams)[0].teamName : ''
    let sortedFixturesList = sortFixtureList(fixturesList)
    const [upcomingMatches,setUpcomingMatches] = useState([])
    const loading = useSelector(state => state.addedFixtures.loading);
  const error = useSelector(state => state.addedFixtures.error);
    useEffect(() => {
      dispatch(fetchTournamentData(tournamentId));
      dispatch(fetchFixturesList(tournamentId));
      tournamentCollection.doc(tournamentId).collection('teams').onSnapshot((snapshot) => {
        let modifiedDocs = 0
          snapshot.docChanges().forEach(change => {
            if(change.type === 'modified') modifiedDocs++;
          })
          if(modifiedDocs)
            {
              dispatch(fetchTournamentData(tournamentId));
            }
      }, err => {
        console.log(err)
      });
      
      tournamentCollection.doc(tournamentId).collection('fixtures').onSnapshot((snapshot) => {
        let modifiedDocs = 0
          snapshot.docChanges().forEach(change => {
            if(change.type === 'modified') modifiedDocs++;
          })
          if(modifiedDocs)
            {
              dispatch(fetchFixturesList(tournamentId));
            }
      }, err => {
        console.log(err)
      });
      

    }, []);

    const getUpcomingFixtures = (list) => {
      let notComplete =list.filter(obj => !obj.isCompleted);
      
      notComplete= sortFixtureList(notComplete)
      const result = notComplete.slice(0, 4);
      return result;

    }

    useEffect(() => {  
        
    let list = getUpcomingFixtures(sortedFixturesList)
    setUpcomingMatches(list);
    }, [fixturesList])
    


    
  return (

    <BgContainer>
        <ScreenHeader title={tournamentName} navigation={navigation}/>
        {loading && <LoaderScreen/>}
        {!isEmpty(upcomingMatches)&& <CardList upcomingMatches={upcomingMatches} tournamentData={tournamentData}/>}
        {/* {!isEmpty(fixturesList)&& fixturesList.every(match => match.isCompleted)&& <>
          <WinnerSection>
            <WinnerNameWrapper>
              <WinnerNameText>
               {winnerTeam}
              </WinnerNameText>
            </WinnerNameWrapper>
          <Lottie source={require('../../assets/Final.json')} 
            autoPlay
            loop={true}
            speed={1.2}/>
          </WinnerSection>

        </>} */}
        <Container>
      <Row>
        <HomeButton iconSize='25' text={'Teams'} icon={faUsers} onPress={()=>navigation.navigate(ROUTE.REVIEW_DATA,{tournamentId,mode:'VIEW'})}/>
        <HomeButton iconSize='25' text={'Schedule'} icon={faList} onPress={()=>navigation.navigate(ROUTE.SHOW_FIXTURES,{tournamentId})} />
      </Row>
      <Row>
        <HomeButton iconSize='25' text={'Table'} icon={faMedal} onPress={()=>navigation.navigate(ROUTE.POINTS_TABLE,{tournamentId})} />
        <HomeButton iconSize='25' text={'Stats'} icon={faRankingStar}  onPress={()=>navigation.navigate(ROUTE.PLAYERS_RANKING,{tournamentId,tournamentName})} />
      </Row>
    </Container>
    </BgContainer>
  )
}

export default TournamentLandingPage