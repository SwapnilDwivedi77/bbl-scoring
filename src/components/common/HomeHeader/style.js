import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'

export const Container = styled.View`
flex-direction:row;
background-color : ${COLORS.PRIMARY};
padding :10px
color : ${COLORS.TEXT_1};
align-content: flex-end;
// border:1px solid red;
`

export const Image = styled.Image`

height : ${(props) => props.height +'px' || 'auto'}
width : ${props => props.width + 'px' || 'auto'}
`


export const MenuIcon = styled.View`
margin: auto 0 0 auto;


`
export const Heading = styled.Text`
font-family: 'Montserrat-Regular';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 20px;
color: #CDCFD3;
margin-top:auto;
`


