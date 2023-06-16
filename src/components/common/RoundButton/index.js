import { View, Text } from 'react-native'
import React from 'react'
import {StyledButton,ButtonIcon} from './style'

const RoundBtn = ({size, color, onPress, icon, iconColor,title,...rest}) => {
  return (
    <StyledButton size={size} color={color} onPress={onPress}{...rest} title={title}>
      {icon &&<ButtonIcon icon={icon} size={size / 2} iconColor={iconColor} />}
    </StyledButton>
  )
}

export default RoundBtn