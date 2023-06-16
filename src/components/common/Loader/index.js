import React from 'react';

import Lottie from 'lottie-react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: rgba(33, 37, 48, 0.8);
  justify-content: center;
  align-items: center;
  position:absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index:999;

`;


const LoaderScreen = () => {
  return (
    <Container>
      <Lottie source={require('../../../assets/loader.json')} 
            autoPlay
            loop={true}
            speed={1.2}
           />
    </Container>
  );
};

export default LoaderScreen;
