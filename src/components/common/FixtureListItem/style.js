import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'

export const MatchHeader = styled.View`
background-color  : ${COLORS.BG_DARK_2};
width:100%;
padding : 10px  20px 10px 10px ;
flex-direction : row;
align-items:center;
`
export const RoundWrapper = styled.View`
`

export const RoundText = styled.Text`
font-family: 'Montserrat-Regular';
font-size: 15px;
line-height: 20px;
color: #8289A3;
`

export const TeamText = styled.Text`
font-family: 'Montserrat-Regular';
font-size: 15px;
line-height: 15px;
color: ${COLORS.TEXT_1};
margin: 0 5px;
`

export const TeamWrapper = styled.View`
flex-direction : row;
margin: 0 0 0 20px;
`
export const VersusSign = styled.View`
  margin-horizontal: 16px;
`;

export const PowerPLayWrapper = styled.View`
margin-left: 10px;
`

export const PlayerWrapper = styled.View`
padding : 10px;
padding-top:20px;
flex-direction : row;
flex:1;
`
export const PlayerText = styled.Text`
font-family: 'Montserrat-Regular';
font-size: 16px;
line-height: 18px;
color: ${COLORS.TEXT_1};
padding-bottom:5px;
`
export const PairWrapper = styled.View`
flex:.4
justify-content:center;
align-items:center;
`
export const MatchIconWrapper = styled.View`
flex:.2
flex-direction:column;
padding:0
align-items:center;
`

export const ScoreText = styled.Text`
font-family: 'Montserrat-SemiBold';
font-size: 16px;
line-height: 18px;
letter-spacing:1px;
color: ${COLORS.ORANGE};
`

export const ScoreWrapper = styled.View`
flex-direction : row;
margin: 0 auto;
`

export const ResultWrapper = styled.View`
padding:0 14px;
margin : 0 0 10px 0;
`

export const ResultText = styled.Text`
font-family: 'Montserrat-Light';
font-size: 14px;
line-height: 16px;
color: ${COLORS.YELLOW};
`


export const ResultTextWrapper = styled.Text`
margin: 0 auto;
`

export const EditIconWrapper = styled.View`
margin: 0 0 0 auto;
z-index:999999;
`

export const VersusImg = styled.Image`
  width:45px;
  height:45px;
`;