import styled from 'styled-components/native';
import { COLORS } from '~/config/Colors'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(43, 47, 58, 0.8);
`;

export const PopupContent = styled.View`
  background-color: #4A5061;
  padding: 16px;
  border-radius: 8px;
  width: 95%;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const SubText = styled.Text`
font-family: 'Montserrat-Regular';
font-size: 10px;
line-height: 10px;
color: ${COLORS.LIME};
margin : 0 auto;

`;

export const DropdownContainer= styled.View`
flex-direction:row;
z-index:9999;
`

export const PlayersContainer = styled.View`
// border:1px solid red;
flex-direction:row;
margin : 20px 0;

`

export const PowerplayChecboxWrapper = styled.View`
flex-flow:row;
margin : 0 0 15px 0
`