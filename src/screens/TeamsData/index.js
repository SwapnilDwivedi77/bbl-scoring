import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ScreenHeader from '../../components/common/ScreenHeader';
import {BgContainer} from '../../styled-component/BackgroundContainer';
import TextInput from '../../components/common/TextInput';
import Card from '../../components/common/Card';
import RoundBtn from '../../components/common/RoundButton';
import {COLORS} from '../../config/Colors';
import firestore from '@react-native-firebase/firestore';

import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {ButtonWrapper} from './style';
import {ROUTE} from '../../navigation/routes';
import {showToast} from '../../components/common/Toast';
import {COLLECTIONS} from '../../constants/collections';
import { tournamentCollection } from '../../config/database';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  courts: Yup.string().required('Required'),
  hours: Yup.string().required('Required'),
  teams: Yup.number().required('Required'),
});

const TeamsData = ({navigation, route}) => {

  const [formState, setFormState] = useState({});

  const {tournamentData, tournamentId} = route.params;

  useEffect(() => {
    let initialState = {};
    Array.from({length: tournamentData.totalTeams}, (_, i) => i + 1).forEach(
      value => {
        initialState['team' + value] = '';
      },
    );
    setFormState(initialState);
  }, []);

  const handleSubmit = values => {
    let teamData = {};
    Object.keys(values).forEach(
      key =>
        (teamData[key] = teamData[key] = {teamName: values[key], players: {}}),
    );
    let colRef = tournamentCollection.doc(tournamentId).collection('teams');
    const promises = [];
    for (const key in teamData) {
      if (teamData.hasOwnProperty(key)) {
        const payload = {key: key, ...teamData[key]};
        const promise = colRef.add(payload);
        promises.push(promise);
      }
    }

    Promise.all(promises)
      .then(results => {
        showToast({
          type: 'success',
          message1: 'Teams Added!',
          message2: 'Continue to add players!',
        });
        navigation.navigate(ROUTE.PLAYERS_DATA,{tournamentId,tournamentData})
      })
      .catch(error => {
        console.error('Error adding documents: ', error);
      });
  };

  return (
    <>
      <ScreenHeader title={'Team Names'} navigation={navigation} />
      <BgContainer>
        <Card
          width={'75%'}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 20,
            paddingTop: 25,
          }}>
          <Formik
            initialValues={formState}
            // validationSchema={FormSchema}
            onSubmit={values => {
              handleSubmit(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {Array.from(
                  {length: tournamentData.totalTeams},
                  (_, i) => i + 1,
                ).map(i => (
                  <TextInput
                    key={'team' + i}
                    id={'team' + i}
                    label={'Team-' + i}
                    onChangeText={handleChange('team' + i)}
                    onBlur={handleBlur('team' + i)}
                    value={values['team' + i]}
                    error={touched['team' + i] && errors['team' + i]}
                    width={240}
                    height={40}
                  />
                ))}

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

export default TeamsData;
