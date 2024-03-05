import React, { useState } from "react";
import {
  Col,
  Row,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import ReactCardSlider from "react-card-slider-component";

import dormphoto from "../../Components/images/dorms/grandaras.png";
import roomimage1 from "../../Components/images/dorms/roomphoto1.jpg";

import "../dormReview/dormReview.css";

const items = [
  {
    src: dormphoto,
    altText: "Slide 1",
    caption: "Slide 1",
    key: 1,
  },
  {
    src: "https://picsum.photos/id/456/1200/400",
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
  {
    src: "https://picsum.photos/id/678/1200/400",
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
];
//rooms
const rooms = [
  {
    image: roomimage1,
    title: "Room Title",
    description: "Room Dexcription",
    clickEvent: "sliderClick",
  },

  {
    image: dormphoto,
    title: "Room Title",
    description: "Room Dexcription",
    clickEvent: "sliderClick",
  },
  {
    image: dormphoto,
    title: "Room Title",
    description: "Room Dexcription",
    clickEvent: sliderClick,
  },
  {
       image: roomimage1,
       title: "Room Title",
       description: "Room Dexcription",
       clickEvent: sliderClick,
     },
];

//this is card slider click event 
function sliderClick(index) {
       console.log("Clicked on slide:", rooms[index]);
       // Buraya tıklanınca yapılacak işlemleri ekleyebilirsiniz
     }
    /////////////////////////////////////////////////////////////////////
function DormReview(args, Rargs) {
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

  // Room Card Carousels
  // const [activeIndexRoom, setActiveIndexRoom] = useState(0);
  // const [animatingRoom, setAnimatingRoom] = useState(false);

  //   const nextroom = () => {
  //        if (animatingRoom) return;
  //        const nextIndexRoom = activeIndexRoom === rooms.length - 1 ? 0 : activeIndexRoom + 1;
  //        setActiveIndexRoom(nextIndexRoom);
  //      };

  //      const previousroom = () => {
  //        if (animatingRoom) return;
  //        const nextIndexRoom = activeIndexRoom === 0 ? rooms.length - 1 : activeIndexRoom - 1;
  //        setActiveIndexRoom(nextIndexRoom);
  //      };
  //      const goToIndexroom = (nextIndexRoom) => {
  //        if (animatingRoom) return;
  //        setActiveIndexRoom(nextIndexRoom);
  //      };
  //      const slidesroom = rooms.map((room) => {
  //        return (
  //          <CarouselItem
  //            onExiting={() => setAnimatingRoom(true)}
  //            onExited={() => setAnimatingRoom(false)}
  //            key={room.src}
  //          >
  //            <img
  //              src={room.src}
  //              alt={room.altText}
  //              style={{
  //                backgroundRepeat: "no-repeat",
  //                width: "20%",
  //                maxHeight: "80ch",
  //              }}
  //            />
  //            {/* <CarouselCaption
  //              captionText={room.caption}
  //              captionHeader={room.caption}
  //            /> */}
  //          </CarouselItem>
  //        );
  //      });

  return (
    <div>
      <Row noGutters>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mb-5">
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
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <section>
            <div className="">
              <h2> Yurt Özellikleri</h2>
              <ul className="check-list  mt-4">
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
              </ul>
            </div>
          </section>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <section>
            <div className="">
              <h2 className=""> Oda Özellikleri</h2>
              <ul className="check-list mt-4">
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
              </ul>
            </div>
          </section>
        </Col>
       
        {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5">
          <div className="maincarddiv">
            <div className="carousel-hostels" id="">
            <Carousel
            activeIndex={activeIndexRoom}
            next={nextroom}
            previous={previousroom}
            {...Rargs}
          >
            <CarouselIndicators
              items={rooms}
              activeIndex={activeIndexRoom}
              onClickHandler={goToIndexroom}
            />
            {slidesroom}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previousroom}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={nextroom}
            />
          </Carousel>
            </div>
          </div>
        </Col> */}

        <Col xs={12} sm={12} md={12} lg={4} xl={8} className="mt-5">
              <div className="roomCard">
              <ReactCardSlider slides={rooms} onClick={sliderClick} />
              

              </div>
        </Col>
      </Row>
    </div>
  );
}

export default DormReview;
