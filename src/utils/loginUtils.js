import AsyncStorage from '@react-native-async-storage/async-storage';

// Store the user's login state in AsyncStorage
async function writeLoginData(userData) {
  let jsonVal = JSON.stringify(userData);
  try {
    await AsyncStorage.setItem('loginState', jsonVal);
  } catch (error) {
    console.log(error);
  }
}

// Retrieve the user's login state from AsyncStorage
async function readLoginData() {
  try {
    const loginState = await AsyncStorage.getItem('loginState');   
    return JSON.parse(loginState);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function toggleLoginFlag() {
  try {
    const loginState = await AsyncStorage.getItem('loginState');   
    let loginObj =  JSON.parse(loginState);
    loginObj.isLoggedIn = !loginObj.isLoggedIn;
    return loginObj;
  } catch (error) {
    console.log(error);
    return false;
  }
}





export {writeLoginData, readLoginData,toggleLoginFlag};
