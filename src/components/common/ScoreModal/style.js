import styled from 'styled-components/native';
import { COLORS } from '../../../config/Colors';

export const ViewWrapper = styled.View`
width:95%;
position: absolute;
zIndex:9999;
top: -680px;
`
export const Container = styled.View`
`;

export const PopupContent = styled.View`
  background-color: #4A5061;
  padding: 5px;
  border-radius: 8px;
  
  padding-bottom : 10px;
`;

export const ScoreContainer = styled.View`
padding:5px;
display:flex;
flex-flow:row;
`
export const ScoreInputContainer = styled.View`
margin : 0  auto 0 auto;
  margin-bottom: 16px;
  border-bottom-width:5px;
  border-bottom-color: ${COLORS.BG_DARK_4}
  border-radius:2px;
`;
export const ScoreInput = styled.TextInput`
width: ${({ width }) => width}px;
height: ${({ height }) => height}px;
padding:8px;
font-size:25px
  border-radius: 5px;
  color: ${COLORS.ORANGE};
  text-align:center;
  font-family: 'Montserrat-Bold';  
  letter-spacing:2px
`;

export const ErrorText = styled.Text`
font-family: 'Montserrat-Regular';
  font-size: 12px;
  line-height: 15px;
  color: red;
  margin-top: 5px;
`

export const ButtonWrapper = styled.View `
margin: 0 0 0 auto;
`

export const PlayersContainer = styled.View`
flex-direction:row;
margin ;
align-items:center;
justify-content:center;

`