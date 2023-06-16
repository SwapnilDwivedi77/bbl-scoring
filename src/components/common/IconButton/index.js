import { View, Text } from 'react-native'
import React from 'react'
import {StyledButton,ButtonIcon, ButtonText} from './style'

const RoundBtn = ({size, color, onPress, icon, iconColor,text,...rest}) => {
  return (
    <StyledButton size={size} color={color} onPress={onPress}{...rest}>
       {text && <ButtonText>{text}</ButtonText> }
      {icon &&<ButtonIcon icon={icon} size={45} iconColor={iconColor} />}
    </StyledButton>
  )
}

export default RoundBtn