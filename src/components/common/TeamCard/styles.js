import styled from 'styled-components/native';
import { COLORS } from '../../../config/Colors';

export const GreenHeading = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  line-height: 15px;
  color: ${COLORS.LIME};
  margin: 0 0 5px 0;
`;
export const SubText = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  line-height: 14px;
  color: ${COLORS.TEXT_1};
`;

export const CardWrapper = styled.View`

width=${props=> props.width || 'auto'}
margin : 5px ;
padding:10px;
`

