import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'
import {TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export const StyledButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: ${(props) => props.color};
`;

export const ButtonIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.iconColor};
`;