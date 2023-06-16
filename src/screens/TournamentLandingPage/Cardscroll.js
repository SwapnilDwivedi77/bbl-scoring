import React, { useEffect, useRef, useState } from 'react';
import {FlatList} from 'react-native'
import styled from 'styled-components/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../config/Colors';
import MatchupCard from '../../components/common/MatchUpCard';
import Matchup from './Matchup';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-top:20px
`;
const PaginationContainer = styled.View`
  padding-vertical: 8px;
`;

const ExampleCarousel = ({upcomingMatches=[]}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const [data,setData] = useState([]);
  useEffect(() => {
    setData(upcomingMatches)
   
  }, [upcomingMatches])
  
  return (
    <Container>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={Matchup}
        keyExtractor={(item) => item.id}
        sliderWidth={400}
        itemWidth={340}
        onSnapToItem={(index) => setActiveIndex(index)}
        useScrollView={true}
        layout={'default'}
        layoutCardOffset={3}
        loop={false}
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={0.9}
      />
      <PaginationContainer>
        <Pagination
          dotsLength={upcomingMatches.length}
          activeDotIndex={activeIndex}
          dotColor={COLORS.LIME}
          inactiveDotColor={COLORS.TEXT_1}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 2
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          containerStyle={{ paddingVertical: 10 }}
        />
      </PaginationContainer>

    </Container>
  );
};

export default ExampleCarousel