import React from 'react'
import Lottie from 'lottie-react-native';
import { BgContainer } from '~/styled-component/BackgroundContainer';
import { ROUTE } from '../../navigation/routes';


const Splash = ({navigation}) => {
    return (
        <BgContainer>
            <Lottie source={require('../../../assets/splash.json')} 
            autoPlay
            loop={false}
            speed={1.2}
            onAnimationFinish={()=> {
            navigation.replace(ROUTE.HOME)
            }}/>
        </BgContainer>
    )
}
export default Splash