import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'


export const Button = styled.TouchableOpacity`
width: 140;
background: #393C47;
border-radius: 5px;
flex-flow:row;
align-items:center;
padding: 10px;
justify-content: center;
margin: 2%
`

export const ButtonText = styled.Text`
font-family: 'Montserrat-Regular';
font-size: 18px;
line-height: 20px;
color: #8289A3;
margin: 0 0 0 10px;
`

export const ButtonIcon = styled.Image`
width: ${props=> props.iconSize || 20}px;
height: ${props => props.iconSize || 20}px;
`