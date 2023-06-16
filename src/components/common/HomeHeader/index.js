import { View, Text, } from 'react-native'
import React from 'react'

import {IMAGES} from '~/assets/images'
import {Container,Heading,Image,MenuIcon} from './style'

import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../../config/Colors';
import { ROUTE } from '../../../navigation/routes';
import {setLogOut, writeLoginData} from '../../../utils/loginUtils'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../../../screens/HomeScreen/loginStateSlice';
import { showToast } from '../Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeHeader = ({navigation}) => {
  const loginData = useSelector(state => state.loginState.login);
  const dispatch = useDispatch();
  const toggleLoginState = async () => {
    let loginVal = {...loginData,isLoggedIn : !loginData.isLoggedIn};
    if(loginData.isLoggedIn) 
       showToast({
      type:'success',
      message1:'Logged out!',
      message2 :'Come back soon!!'
    })
    const loginState = await AsyncStorage.removeItem('loginState');
   dispatch(setLoginState(loginVal))
  }

  return (
    <Container>
      <Image source={IMAGES.HEADER_ICON} width={30} height={30} />  
      <Heading>BBL</Heading>
    <MenuIcon>
    <StyledButton onPress={()=>loginData &&loginData.isLoggedIn ? toggleLoginState(): navigation.navigate(ROUTE.LOGIN)}>
      <FontAwesomeIcon icon={loginData &&loginData.isLoggedIn ? faRightFromBracket :  faRightToBracket} size={20} color={COLORS.TEXT_1} />
    </StyledButton>
    </MenuIcon>
    </Container>
  )
}


const StyledButton = styled.TouchableOpacity`
`;

export default HomeHeader