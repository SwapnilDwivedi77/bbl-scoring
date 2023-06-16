import React, { useState } from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ScreenHeader from '../../components/common/ScreenHeader';
import {BgContainer} from '../../styled-component/BackgroundContainer';
import TextInput from '../../components/common/TextInput';
import Card from '../../components/common/Card';
import RoundBtn from '../../components/common/RoundButton';
import {COLORS} from '../../config/Colors';

import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {ButtonWrapper} from './style';
import {ROUTE} from '../../navigation/routes';
import firestore from '@react-native-firebase/firestore';
import { COLLECTIONS } from '../../constants/collections';
import { showToast } from '../../components/common/Toast';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TournamentData = ({navigation}) => {

  const [hasKnockout,setHasKnockout] = useState(false)


  const handleSubmit = values => {

    firestore()
      .collection(COLLECTIONS.TOURNAMENTS)
      .add({
        ...values,
        hasKnockout,
        isPublished:false,
      })
      .then((docRef) => {
        showToast({
          type:'success',
          message1:'Tournament draft added!',
          message2:'Continue to add teams!'
        })
        navigation.navigate(ROUTE.TEAMS_DATA, {tournamentData:values,tournamentId: docRef.id});
      }).catch(error => console.log(error));

    console.log({values})
    
      
  };
  return (
    <>
      <ScreenHeader title={'Tournament Data'} navigation={navigation} />
      <BgContainer>
        <Card
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 20,
            paddingTop: 25,
            paddingRight: 20,
          }}>
          <Formik
            initialValues={{
              tournamentName: '',
              totalCourts: '',
              totalHours: '',
              totalTeams: '',
              roundsPerHours: '',
              playersPerTeam: '',
            }}
            // validationSchema={FormSchema}
            onSubmit={values => handleSubmit(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  key="tournamentName"
                  label="Name"
                  onChangeText={handleChange('tournamentName')}
                  onBlur={handleBlur('tournamentName')}
                  value={values.tournamentName}
                  error={touched.tournamentName && errors.tournamentName}
                  width={240}
                  height={40}
                />
                <TextInput
                  key="totalCourts"
                  label="Courts"
                  onChangeText={handleChange('totalCourts')}
                  onBlur={handleBlur('totalCourts')}
                  value={values.totalCourts}
                  keyboardType="numeric"
                  error={touched.totalCourts && errors.totalCourts}
                  width={240}
                  height={40}
                />

                <TextInput
                  key="totalHours"
                  label="Hours"
                  onChangeText={handleChange('totalHours')}
                  onBlur={handleBlur('totalHours')}
                  value={values.totalHours}
                  keyboardType="numeric"
                  error={touched.totalHours && errors.totalHours}
                  width={240}
                  height={40}
                />
                <TextInput
                  key="rounds"
                  label="Rounds/hr"
                  onChangeText={handleChange('roundsPerHours')}
                  onBlur={handleBlur('roundsPerHours')}
                  value={values.roundsPerHours}
                  keyboardType="numeric"
                  error={touched.roundsPerHours && errors.roundsPerHours}
                  width={240}
                  height={40}
                />

                <TextInput
                  key="totalTeams"
                  label="Teams"
                  onChangeText={handleChange('totalTeams')}
                  onBlur={handleBlur('totalTeams')}
                  value={values.totalTeams}
                  keyboardType="numeric"
                  error={touched.totalTeams && errors.totalTeams}
                  width={240}
                  height={40}
                />

                <TextInput
                  key="playersPerTeam"
                  label="Players/Team"
                  onChangeText={handleChange('playersPerTeam')}
                  onBlur={handleBlur('playersPerTeam')}
                  value={values.playersPerTeam}
                  keyboardType="numeric"
                  error={touched.playersPerTeam && errors.playersPerTeam}
                  width={240}
                  height={40}
                />

                <BouncyCheckbox
                  text={'Include Semi-final and Final'}
                  key={'semi-final'}
                  size={15}
                  fillColor={COLORS.LIME}
                  isChecked={hasKnockout}
                  textStyle={{
                    textDecorationLine: 'none',
                    color: COLORS.TEXT_1,
                  }}
                  onPress={(checked)=>{console.log('CHECKED',checked); setHasKnockout(checked)}}
                />

                <ButtonWrapper>
                  <RoundBtn
                    onPress={values => {
                      handleSubmit(values);
                    }}
                    size={40}
                    type="submit"
                    color={COLORS.PURPLE}
                    icon={faArrowRight}
                    iconColor={COLORS.TEXT_1}
                  />
                </ButtonWrapper>
              </>
            )}
          </Formik>
        </Card>
      </BgContainer>
    </>
  );
};

export default TournamentData;
