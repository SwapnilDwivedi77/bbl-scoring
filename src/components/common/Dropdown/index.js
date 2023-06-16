import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import { COLORS } from '../../../config/Colors';
import { DropDownPickerWrapper } from './style';

const StyledText = styled.Text`
  font-family: 'Montserrat-Regular';
  
  font-size: 16px;
  line-height: 15px;
  color: ${({ color }) => color};
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px`};
`;
const StyledErrorText = styled.Text`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: red;
  margin-top: 5px;
`;

export const Dropdown = ({ label, onValueChange,items, selectedValue, error,setItems, width, height=0,...rest }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  console.log('TEAMS DROPDOWN',items.length)
  return (
    <DropDownPickerWrapper>
      <StyledText color="#CEE04A" marginBottom={5}>
        {label}
      </StyledText>
      <DropDownPicker
      dropDownDirection="AUTO"
      bottomOffset={200}
      textStyle={{
        fontSize: 15,
        color:COLORS.TEXT_1
      }}
      iconStyle={{
        color:COLORS.TEXT_1
      }}
      selectedItemLabelStyle={{
        color: COLORS.ORANGE
      }}
      maxHeight={250}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      dropDownContainerStyle={{
        backgroundColor:COLORS.BG_DARK_3,
        borderWidth:0,
        width:width,
        textColor:COLORS.TEXT_1,
        height:500,
        fontSize:10,
      }}
      TickIconComponent={({style}) => <FontAwesomeIcon icon={faCheck} size={20} color={COLORS.TEXT_1} />}
      ArrowDownIconComponent={({style}) => <FontAwesomeIcon icon={faAngleDown} size={20} color={COLORS.TEXT_1} />
      
    }
    {...rest}
    style={{
      backgroundColor: COLORS.BG_DARK_4,
      borderWidth:0,
      width:width,
      color:COLORS.TEXT_1,
      
    }}
    />
      {error ? <StyledErrorText>{error}</StyledErrorText> : null}
    </DropDownPickerWrapper>
  );
};


