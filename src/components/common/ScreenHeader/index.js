import { View, Text } from 'react-native'
import React from 'react'
import {Container,Heading,Image,Dot} from './style'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styled from 'styled-components/native';
import {IMAGES} from '~/assets/images'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../../config/Colors';

const ScreenHeader = ({onPress,title,navigation}) => {
  return (
    <Container>

    
    <StyledButton onPress={()=> navigation.goBack()}>
      <FontAwesomeIcon icon={faArrowLeft} size={15} color={COLORS.TEXT_1} />
    </StyledButton>
     
    <Heading>{title}</Heading>
    <Dot></Dot>
    <Image source={IMAGES.HEADER_ICON} width={30} height={30} style={{marginLeft:'auto'}}/>  
      
    
    </Container>
  )
}

const StyledButton = styled.TouchableOpacity`
width: 30px;
height: 30px;
border-radius : 15px;
background-color: ${COLORS.BG_DARK_4};
justify-content : center;
align-items:center;
`;

export default ScreenHeader