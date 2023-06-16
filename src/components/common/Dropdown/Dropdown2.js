import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const Dropdown2 = () => {
  
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const [selectedValue, setSelectedValue] = useState(options[0]);


  return (
    <DropDownPicker
      items={options}
      defaultValue={selectedValue}
      containerStyle={{ height: 40 }}
      onChangeItem={(item) => setSelectedValue(item.value)}
    />
  );
};

export default Dropdown2;
