import firestore from '@react-native-firebase/firestore';

export const playersCollection = firestore().collection('players');
export const tournamentCollection = firestore().collection('tournaments');