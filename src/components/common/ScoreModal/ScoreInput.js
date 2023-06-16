import { View, Text } from 'react-native'
import React from 'react'

import { ScoreInput, ScoreInputContainer,ErrorText } from './style'

const ScoreInputText = ({ onChangeText, onBlur, value, error, keyboardType, width, height,...rest }) => {
    return (
        <ScoreInputContainer>
            <ScoreInput onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                keyboardType={keyboardType}
                width={width}
                height={height}
                {...rest} />

            {error ? <ErrorText>{error}</ErrorText> : null}

        </ScoreInputContainer>
    )
}

export default ScoreInputText