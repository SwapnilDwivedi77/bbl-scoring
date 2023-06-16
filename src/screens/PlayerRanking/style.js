
import styled from 'styled-components';
import { COLORS } from '../../config/Colors';

export const Container = styled.View`
  background-color: ${COLORS.BG_DARK_3};
  padding: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom-color: ${COLORS.BG_DARK_4};
  border-bottom-width: 1px;
`;

export const HeaderText = styled.Text`
  color: ${COLORS.TEXT_1};
  font-weight: bold;
  font-size: 14px;
`;

export const Row = styled.View`
  flex-direction: row;
  border-bottom-width: 1px; /* add this line */
  border-color: ${COLORS.BG_DARK_4};
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
`;

export const TeamName = styled.Text`
  color: ${COLORS.LIGHT_BLUE};
  font-weight: bold;
  font-size: 14px;
`;

export const MatchPlayed = styled.Text`
  color: ${COLORS.TEXT_1};
  font-size: 14px;
`;

export const Won = styled.Text`
  color: ${COLORS.LIME};
  font-weight: bold;
  font-size: 14px;
`;

export const Lost = styled.Text`
  color: ${COLORS.ORANGE};
  font-weight: bold;
  font-size: 14px;
`;

export const Points = styled.Text`
  color: ${COLORS.YELLOW};
  font-weight: bold;
  font-size: 14px;
`;