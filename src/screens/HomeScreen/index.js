import React, {useEffect, useState} from 'react';
import {faCross, faEllipsisV, faPlus, faXmark} from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import {useSelector, useDispatch} from 'react-redux';
import {BgContainer} from '~styled-component/BackgroundContainer';
import HomeHeader from '~components/common/HomeHeader';
import RoundBtn from '~components/common/RoundButton';
import {COLORS} from '~config/Colors';
import {BtnContainer, TextStyled, SectionWrapper, TournamentListWrapper, TrmntListItemWrapper, DraftWrapper, MenuWrapper} from './style';
import HeadingText from '~styled-component/HeadingText';
import Card from '~components/common/Card';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../assets/images';
import {ROUTE} from '../../navigation/routes';
import {getLoginState} from '../../utils/loginUtils';
import {fetchTournamentList} from './tournamentListSlice';
import { isEmpty } from '../../utils';
import DraftActionMenu from './DraftActionMenu';
import { readLoginState, resetLoginState } from './loginStateSlice';
import { tournamentCollection } from '../../config/database';
import LoaderScreen from '../../components/common/Loader';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.loginState.login);
  const [actionLoad,setActionLoad] = useState(false)

  const [menuVisible, setMenuVisible] = useState(false);

  const hideMenu = () => setMenuVisible(false);

  const showMenu = () => setMenuVisible(true);
  
  useEffect(() => {
    dispatch(readLoginState())
    dispatch(fetchTournamentList());
  }, []);

  const tournamentList = useSelector(state => state.tournamentList.list);
  const loading = useSelector(state => state.tournamentList.loading);
  const error = useSelector(state => state.tournamentList.error);

  const [draftTournaments, setDraftTournaments] = useState([]);
  const [publishedTournaments, setPublishedTournaments] = useState([]);

  useEffect(() => {
    let draftList = [],
      publishedList = [];
    tournamentList.forEach(tournament => {
      if (tournament.isPublished) publishedList.push(tournament);
      else draftList.push(tournament);
    });
    setDraftTournaments(draftList);
    setPublishedTournaments(publishedList);
  }, [tournamentList]);


  const menuItemTextStyle = {
    color:COLORS.TEXT_1,
    fontFamily: 'Montserrat-Regular',
fontSize: 14,
lineHeight: 17
  }


   
 const handlePublishTournaments = async (id) => {

  setActionLoad(true);
  await tournamentCollection.doc(id).update({isPublished: true}).then(res=> {
    dispatch(fetchTournamentList()).then(res=>{
      setActionLoad(false);
    });
  }).catch(err=> {

  })
 }


  const DraftTournamentRenderItem = ({data}) => (
    <TrmntListItemWrapper> 
        <Card
          height={40}
          width={170}
          style={{justifyContent: 'center', paddingLeft: 15}}>
           <DraftWrapper>
           <TextStyled>{data.tournamentName}</TextStyled>
           <MenuWrapper>
           <DraftActionMenu handlePublishTournaments={handlePublishTournaments} draftID={data.id}/>
           </MenuWrapper>
            </DraftWrapper>         
        </Card>
    </TrmntListItemWrapper>
  );


 


  return (
    <>
      <HomeHeader navigation={navigation} />
      <BgContainer>
        {actionLoad&& <LoaderScreen/>}
        <BtnContainer>
          { loginData && loginData.isAdmin && loginData.isLoggedIn && (
            <Menu
              visible={menuVisible}
              anchor={
                <RoundBtn
                  onPress={() => {
                    showMenu();
                  }}
                  size={40}
                  color={COLORS.PURPLE}
                  icon={menuVisible ? faXmark : faPlus}
                  iconColor={COLORS.TEXT_1}
                />
              }
              onRequestClose={hideMenu}
              style={{
                backgroundColor: COLORS.BG_DARK_4,
                zIndex:999,
                position:"absolute",
                left:320,
                top:670     
              }}>
              <MenuItem textStyle={menuItemTextStyle} onPress={()=>navigation.navigate(ROUTE.LOGIN,{action:'ADD_PLAYER'})}>
                Add Players
              </MenuItem>
              <MenuItem textStyle={menuItemTextStyle} onPress={()=> navigation.navigate(ROUTE.TOURNAMENT_DATA)}>
                Add Tournaments
              </MenuItem>
            </Menu>
          )}
        </BtnContainer>

        {!isEmpty(publishedTournaments) && (
          <SectionWrapper>
            <HeadingText style={{marginBottom: 10}}>
              Active Tournaments
            </HeadingText>

            <TournamentListWrapper>
            <FlatList
                horizontal
                data={publishedTournaments}
                renderItem={({item}) => (
                  <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate(ROUTE.TOURNAMENT_LANDING_PAGE, {
                    tournamentData: item,
                  })
                }
                android_ripple={true}>
                <Card
                  height={40}
                  width={170}
                  style={{justifyContent: 'center', paddingLeft: 15,marginLeft:5}}>
                  <TextStyled style={{color: COLORS.LIME}}>
                    {item.tournamentName}
                  </TextStyled>
                </Card>
              </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
              />
              </TournamentListWrapper>
            
          </SectionWrapper>
        )}

        {loginData &&loginData.isLoggedIn && loginData.isAdmin && (
          <SectionWrapper>
            <HeadingText style={{marginBottom: 10}}>
              Draft Tournaments
            </HeadingText>
            <TournamentListWrapper>
              <FlatList
                horizontal
                data={draftTournaments}
                renderItem={({item}) => (
                  <DraftTournamentRenderItem data={item} />
                )}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </TournamentListWrapper>
          </SectionWrapper>
        )}
        <Image
          source={IMAGES.BACKGROUND_SHUTTLE}
          style={{
            width: '100%',
            height: '125%',
            resizeMode: 'contain',
            zIndex: -1,
            position: 'absolute',
          }}
        />
      </BgContainer>
    </>
  );
};

export default HomeScreen;
