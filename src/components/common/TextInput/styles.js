import styled from 'styled-components/native';
import { COLORS } from '../../../config/Colors';

export const InputContainer = styled.View`
  margin-bottom: 16px;
  z-index:-1;
`;

export const Label = styled.Text`
  font-family: 'Montserrat-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: ${COLORS.LIME};
  margin-bottom:5px;
`;

export const Input = styled.TextInput`
width: ${({ width }) => width}px;
height: ${({ height }) => height}px;
  background: #393C47;
  border-radius: 5px;
  color: ${COLORS.TEXT_1};
  padding: 8px;
  font-size : 16px;
`;

export const ErrorText = styled.Text`
font-family: 'Montserrat-Regular';
  font-size: 12px;
  line-height: 15px;
  color: red;
  margin-top: 5px;
`