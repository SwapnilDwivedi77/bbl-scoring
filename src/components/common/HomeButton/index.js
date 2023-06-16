import { View, Text } from 'react-native'
import React from 'react'
import { Button, ButtonIcon, ButtonText } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../../config/Colors'



const HomeButton = ({iconSize='',icon,text,onPress}) => {
  return (
    <Button onPress={onPress}>
        <FontAwesomeIcon icon={icon} color={COLORS.DARK_TEXT} size={iconSize || 20}/>   
        <ButtonText>{text}</ButtonText>
    </Button>
  )
}

export default HomeButton