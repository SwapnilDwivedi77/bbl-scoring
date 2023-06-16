import { faEllipsisV, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { COLORS } from '../../config/Colors';

export default function DraftActionMenu({handlePublishTournaments,draftID}) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const MenuIcon = () => (

    <TouchableOpacity onPress={showMenu}>
        <FontAwesomeIcon icon={faEllipsisV} color={COLORS.DARK_TEXT} size={20}/>
    </TouchableOpacity>
  )

  const menuItemTextStyle = {
    color:COLORS.TEXT_1,
    fontFamily: 'Montserrat-Regular',
fontSize: 14,
lineHeight: 17
  }

const publishAction = () => {
  handlePublishTournaments(draftID);
  hideMenu();
}

  return (
    <View style={{alignItems: 'center', justifyContent: 'center' }}>
      <Menu
        visible={visible}
        anchor={<MenuIcon/>}
        onRequestClose={hideMenu}
        style={{
            backgroundColor:COLORS.BG_DARK_4,height:150,
        }}
      >
        <MenuItem textStyle={menuItemTextStyle} onPress={hideMenu}>Edit</MenuItem>
        <MenuItem textStyle={menuItemTextStyle}onPress={publishAction}>Publish</MenuItem>
        <MenuItem textStyle={menuItemTextStyle} onPress={hideMenu}>Delete</MenuItem>
      </Menu>
    </View>
  );
}