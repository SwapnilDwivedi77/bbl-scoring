import { View, Text } from 'react-native'
import React, { useRef } from 'react'

import { ScoreInput, ScoreInputContainer,ErrorText } from './style'

const ScoreInputText = ({ onChangeText, onBlur, value, error, keyboardType, width, height,...rest }) => {
    
    const myInput = useRef();
    const handleOnPress = () => {
        myInput.current.focus();  // This line keeps the keyboard open.
      };
    return (
        <ScoreInputContainer>
            <ScoreInput onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                keyboardType={keyboardType}
                width={width}
                height={height}
                onPress={handleOnPress}
                ref={myInput}
                {...rest}  />

            {error ? <ErrorText>{error}</ErrorText> : null}

        </ScoreInputContainer>
    )
}

export default ScoreInputText