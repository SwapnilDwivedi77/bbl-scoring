import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {BgContainer} from '../../styled-component/BackgroundContainer';
import Card from '../../components/common/Card';
import TextInput from '../../components/common/TextInput';
import RoundBtn from '../../components/common/RoundButton';
import {ROUTE} from '../../navigation/routes';
import {COLORS} from '../../config/Colors';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Wrapper} from './style';
import {playersCollection} from '../../config/database';
import {isEmpty} from '../../utils';
import {setLoginState} from '../../screens/HomeScreen/loginStateSlice'
import { useDispatch, useSelector } from 'react-redux';
import ScreenHeader from '../../components/common/ScreenHeader';
import { showToast } from '../../components/common/Toast';

const LoginScreen = ({navigation,route}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  // If null, no SMS has been sent
  const [loginInfo, setLoginInfo] = useState({});
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const loginData = useSelector(state => state.loginState.login);
  const dispatch = useDispatch();
  const addPlayerAction = route.params?.action == 'ADD_PLAYER' || ''
  async function signInWithPhoneNumber(phoneNumber) {
    playersCollection
      .where('mobNumber', '==', phoneNumber)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          showToast({
            type: 'info',
            message1: 'Do you know Swapnil?? 🤓',
            message2: 'Ask him to add you to BBL',
          });
          setShowSignUp(true);
        } else {
          let playersInfo = querySnapshot.docs[0];
          setLoginInfo(playersInfo._data);
          dispatch(setLoginState({...playersInfo._data,isLoggedIn:true}));
          showToast({
            type: 'success',
            message1: `Welcome back ${playersInfo._data.name} 😃.`,
          });
          navigation.navigate(ROUTE.HOME)
        }
      });
  }



  const handleFormSubmit = async () => {
   await playersCollection
      .add({
        mobNumber: '+91' +mobileNumber,
        name:  playerName,
        isAdmin: false,
      })
      .then(res => {
        showToast({
          type: 'success',
          message1: `Yeyeyye, clan just got expanded!`,
        });
        setPlayerName('');
        setMobileNumber('');

      })
      .catch(error => {
        showToast({
          type: 'error',
          message1: 'Oops Something went wrong!',
        });
      });
  };

  const getLoginForm = () => {
    if(loginData || !loginData?.isLoggedIn)
      return (
        <>
          <TextInput
            label={'Mobile Number'}
            type="number"
            keyboardType={'numeric'}
            inputMode={'tel'}
            onChangeText={value => setMobileNumber(value)}
            value={mobileNumber}
            // error={touched['team'+i] && errors['team'+i]}
            width={240}
            height={40}
          />
          <RoundBtn
            onPress={() => {
              signInWithPhoneNumber('+91' + mobileNumber)
            }}
            size={40}
            color={COLORS.PURPLE}
            icon={faArrowRight}
            iconColor={COLORS.TEXT_1}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          />
        </>
      );
    
  };

  return (
    <>
      <BgContainer>
        <ScreenHeader title={addPlayerAction ? 'Add Player' : 'Login'} navigation={navigation}/>
        <Wrapper>

          <Card width={'70%'}>
            {getLoginForm()}
            {addPlayerAction&& (
              <>
                <TextInput
                  label={'Player Name'}

                  onChangeText={text => setPlayerName(text)}
                  // onBlur={handleBlur('team'+i)}
                  value={playerName}
                  // error={touched['team'+i] && errors['team'+i]}
                  width={240}
                  height={40}
                />
                <TextInput
            label={'Mobile Number'}
            type="number"
            keyboardType={'numeric'}
            inputMode={'tel'}
            onChangeText={value => setMobileNumber(value)}
            value={mobileNumber}
            // error={touched['team'+i] && errors['team'+i]}
            width={240}
            height={40}
          />
                <RoundBtn
                  onPress={() => handleFormSubmit()}
                  size={40}
                  color={COLORS.PURPLE}
                  icon={faArrowRight}
                  iconColor={COLORS.TEXT_1}
                  style={{marginLeft: 'auto', marginRight: 'auto'}}
                />
              </>
            )}
          </Card>
        </Wrapper>
      </BgContainer>
    </>
  );
};

export default LoginScreen;
