import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'


export const TeamsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding:5px;
  justify-content:center;
`

export const SectionHeading = styled.Text`
font-family: 'Montserrat-SemiBold';
font-size: 14px;
line-height: 17px;
color: ${COLORS.LIGHT_BLUE};
margin:0 0 0 20px;

`
export const SubText = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  line-height: 14px;
  color: ${COLORS.TEXT_1};
  margin: 5px 0 0 0 ;
`;