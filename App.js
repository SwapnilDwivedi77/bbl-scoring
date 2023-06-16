import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '~/navigation/AppNavigator'
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/store/index';

const App = ({navigation}) => {
  
  return (
  <>
  <Provider store={store}>
  <NavigationContainer>
      
      <AppNavigator />
    </NavigationContainer>
    <Toast/>
    </Provider>
  </>
     
  );
};

export default App;
