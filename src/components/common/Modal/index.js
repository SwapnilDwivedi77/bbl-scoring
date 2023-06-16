import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const CustomModal = ({ children }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: Dimensions.get('window').width * 0.8, // 80% of the screen width
    maxHeight: Dimensions.get('window').height * 0.8, // 80% of the screen height
  },
});

export default CustomModal;
