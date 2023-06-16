import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'
import {TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export const StyledButton = styled(TouchableOpacity)`
flex-direction :row;
align-items:center;

padding: 5px 0 5px 10px;
 width: ${(props) => props.size ? props.size : 100}px;
  border-radius: 40px;
  background-color: ${(props) => props.color};
`;

export const ButtonIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.iconColor};
  margin: 0 0 0 auto;
`;

export const ButtonText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 18px;
  line-height: 20px;
  color:#fff
  margin: 0 auto 5px auto;
`;