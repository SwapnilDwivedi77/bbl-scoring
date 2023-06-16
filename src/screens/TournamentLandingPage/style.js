import styled from 'styled-components/native';
export const Container = styled.View`
    margin: 20% 0;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const WinnerSection = styled.View`
height:40%;

`

export const PodiumImage = styled.Image`
  width :100%;
  height:60%;
`;

export const WinnerNameWrapper = styled.View`
position:relative;
left:0;
right:0;
top:20%;
margin : 0 auto;
zIndex:9999
`

export const WinnerNameText = styled.Text`
font-family: 'Montserrat-Bold';
font-style: normal;
font-weight: 700;
font-size: 45px;
line-height: 50px;
letter-spacing: 2px;

color: #FF9C07;
`