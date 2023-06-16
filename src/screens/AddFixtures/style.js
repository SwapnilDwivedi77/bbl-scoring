import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'


export const Wrapper = styled.View`
justify-content:center;
align-items:center;
margin-top:30px;
`

export const ButtonWrap = styled.View`

align-items:center;
`

export const CardWrap = styled.View`

width:80%;
margin : 0 auto 0 auto;
`

export const MatchHeading = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  line-height: 15px;
  color: ${COLORS.LIME};
  margin-bottom:5px;
`;

export const DropdownWrap= styled.View`

width:80%;
justify-content: center;
align-items: center;
margin-bottom:20px;
`

export const RoundHeading = styled.Text`
font-family: 'Montserrat-SemiBold';
  font-size: 16px;
  line-height: 15px;
  letter-spacing : 1px;
  color: ${COLORS.TEXT_1};
  margin:0 auto 15px 11%;
`

export const RoundCount = styled.Text`
font-family: 'Montserrat-Bold';
  font-size: 16px;
  line-height: 15px;
  letter-spacing : 1px;
  color: ${COLORS.ORANGE};
]
`