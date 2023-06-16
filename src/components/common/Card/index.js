import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../config/Colors';

const CardWrapper = styled.View`
  background-color: ${props => props.bgColor ? props.bgColor : COLORS.BG_DARK_2};
  border-radius: 5px;
  padding:10px;
  height: ${props => props.height || 'auto'};
  width: ${props => props.width || 'auto'};
`;

const Card = ({ height, width, children, ...rest }) => {
  return (
    <CardWrapper height={height} width={width} {...rest}>
      {children}
    </CardWrapper>
  );
};


export default Card;