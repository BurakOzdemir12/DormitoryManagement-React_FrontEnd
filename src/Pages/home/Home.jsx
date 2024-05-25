import React, { useState } from 'react'
import "../home/Home.css"
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col } from 'reactstrap';
import dormphoto from "../../Components/images/dorms/grandaras.png";
import akdeniz from "../../Components/images/dorms/akdeniz.jpg";
import longson from "../../Components/images/dorms/longson.jpg";
import { Box } from '@mui/material';
import Counter from '../../Components/counter/Counter';

const items = [
  {
    src: dormphoto,
    altText: "Slide 1",
    caption: "Slide 1",
    key: 1,
  },
  {
    src: akdeniz,
    altText: "Akdeniz Yurdu",
    caption: "Akdeniz Yurdu",
    key: 2,
  },
  {
    src: longson ,
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
];

const Home = (args) => {
  
  //main Dorm image carousels
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          className="carouselimg"
          src={item.src}
          alt={item.altText}
          style={{
            backgroundRepeat: "no-repeat",
            width: "100%",
            maxHeight: "80ch",
          }}
        />
        <CarouselCaption

          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  return (
    <Box>
       <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mb-1  ">
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
        </Col>
        <Counter/>
 
    </Box>
  )
}

export default Home