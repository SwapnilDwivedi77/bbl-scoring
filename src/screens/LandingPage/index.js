import { Image,View } from 'react-native'
import React from 'react'
import { IMAGES } from '~/assets/images'
import { BgContainer } from '~/styled-component/BackgroundContainer'

const LandingPage = () => {
  return (
    <BgContainer>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
        <Image source={IMAGES.LOGO} />
        </View>   
    </BgContainer>
  )
}

export default LandingPage