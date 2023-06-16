import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'


export const Container = styled.View`
flex-direction:row;
background-color : ${COLORS.PRIMARY};
padding :20px 10px
color : ${COLORS.TEXT_1};
align-content: flex-end;
// border:1px solid red;
`

export const Image = styled.Image`

height : ${(props) => props.height || 'auto'}
width : ${props => props.width || 'auto'}
`


export const BackIcon = styled.View`
// margin: auto 0 0 auto;


`
export const Heading = styled.Text`
font-family: 'Montserrat-Regular';
font-size: 20px;
line-height: 24px;
color: #CDCFD3;
letter-spacing:1px;
margin :0 0 0 auto;
`

export const Dot = styled.View`
height : 6px;
width:6px;
background-color : ${COLORS.LIME};
border-radius:3px;
margin: 13px 0 0 3px;

`
