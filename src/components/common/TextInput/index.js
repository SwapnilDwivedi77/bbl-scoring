import { View, Text } from 'react-native'
import React from 'react'

import { InputContainer, Label, Input, ErrorText } from './styles'

const TextInput = ({ label, onChangeText, onBlur, value, error, keyboardType, width, height,...rest }) => {
    return (
        <InputContainer>
            <Label>{label}</Label>
            <Input onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                keyboardType={keyboardType}
                width={width}
                height={height}
                {...rest} />

            {error ? <ErrorText>{error}</ErrorText> : null}

        </InputContainer>
    )
}

export default TextInput