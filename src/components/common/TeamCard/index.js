import { View, Text } from 'react-native'
import React from 'react'
import Card from '../Card'
import { CardWrapper, GreenHeading,SubText } from './styles'

const TeamCard = ({teamData,width,style}) => {
  return (
    <CardWrapper width={width}>
    <Card  style={{...style}}>
        <GreenHeading>{teamData.teamName}</GreenHeading>
        {teamData.players.map(({name},index)=> <SubText key={index}>{name}</SubText>)}

    </Card>
    </CardWrapper>
  )
}

export default TeamCard