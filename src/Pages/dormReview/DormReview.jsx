import React, { useEffect, useState } from "react";
import {
  CButton,
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";
import {
  Col,
  Row,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  CardImgOverlay,
  CardImg,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Form,
  FormGroup,
  Container,
} from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";

import ReactCardSlider from "react-card-slider-component";

import dormphoto from "../../Components/images/dorms/grandaras.png";
import roomimage1 from "../../Components/images/dorms/roomphoto1.jpg";
import roomimage2 from "../../Components/images/dorms/grandaras.png";

import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { BsCardImage, BsFillPeopleFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";

import "../dormReview/dormReview.css";
import "../dormReview/dormReviewComment.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { Box, TablePagination, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import axios from "axios";

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
//room occupancy
const occupancy = [
  {
    person: 1,
    color: "danger",
  },
  { person: 2, color: "primary" },
  { person: 1, color: "danger" },
  { person: 3, color: "secondary" },
  { person: 1, color: "primary" },
  { person: 3, color: "primary" },
  { person: 1, color: "primary" },
  { person: 1, color: "primary" },
  { person: 2, color: "secondary" },
  { person: 1, color: "primary" },
  { person: 1, color: "primary" },
];
//rooms
const roomst = [
  {
    id: 1,
    img: roomimage1,
    title: "Single Room",
    description: "Room description",
    pricingText: "100 dollar",
    features: ["Free Wifi", "Free breakfast"],
    clickEvent: "sliderClick",
  },
  {
    id: 2,
    img: roomimage1,
    title: "Double Room",
    description: "Room description",
    pricingText: "100 dollar",
    features: ["Free Wifi", "Free breakfast"],
    clickEvent: "sliderClick",
  },
  {
    id: 3,
    img: roomimage1,
    title: "Suit",
    description: "Room description",
    pricingText: "100 dollar",
    features: ["Free Wifi", "Free breakfast"],
    clickEvent: "sliderClick",
  },
  {
    id: 4,
    img: roomimage1,
    title: "King Suit",
    description: "Room description",
    pricingText: "5000 dollar",
    features: ["Free Wifi", "Free breakfast"],
    clickEvent: "sliderClick",
  },
  {
    id: 4,
    img: roomimage1,
    title: "King Suit",
    description: "Room description",
    pricingText: "5000 dollar",
    features: ["Free Wifi", "Free breakfast"],
    clickEvent: "sliderClick",
  },
  {
    id: 4,
    img: roomimage1,
    title: "King Suit",
    description: "Room description",
    pricingText: "5000 dollar",
    features: ["Free Wifi", "Free breakfast"],
    clickEvent: "sliderClick",
  },
  {
    id: 4,
    img: roomimage1,
    title: "King Suit",
    description: "Room description",
    pricingText: "5000 dollar",
    features: ["Free Wifi", "Free breakfast"],
    clickEvent: "sliderClick",
  },
];

/////////////////////////////////////////////////////////////////////
const additionalStyle = window.innerWidth <= 1201 ? { display: "none" } : {};
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        ...additionalStyle,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        ...additionalStyle,
      }}
      onClick={onClick}
    />
  );
}
function DormReview(args, Rargs, direction, ...argss) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Fetch Rooms
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8800/rooms");

        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const cookies = new Cookies();

  const userToken = cookies.get("jwt_auth");
  const user = userToken ? jwtDecode(userToken) : null;
  const id = user ? user.id : null;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,

    slidesToScroll: 4,
    slidesToShow: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

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
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  //Rezervation canvas visible
  const [visible, setVisible] = useState(false);
  //comment canvas visible
  const [commentvisible, setRezVisible] = useState(false);

  //handle Pagination for Room List
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Row noGutters>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mb-5  ">
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
          <section
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
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
          <section
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
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

        <Col xl={10} className="mt-5 divvv ">
          {/* <ReactCardSlider slides={rooms} onCardClick={handleCardClick}  /> */}

          <Slider 
           className=" mb-5   " {...settings}>
            {roomst.map((room) => (
              <Col className="  "
              >
                <Card
                  className=" mb-5 mt-1 divvv "
                  style={{
                    maxWidth: "18rem",
                  }}
                >
                  <img
                    className="divvv"
                    key={room.id}
                    alt="Sample"
                    
                    src={room.img}
                    style={{
                      backgroundRepeat: "no-repeat",

                      height: "45ch",
                    }}
                  />
                  <CardBody
                  >
                    <CardTitle tag="h5">{room.title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {room.pricingText}
                    </CardSubtitle>
                    <CardText>{room.features}</CardText>
                    <Button key={room.name} onClick={toggle}>
                      Read More
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Slider>
        </Col>
      </Row>
      <Row noGutters>
        <hr className="hr mt-3" />

        <Col xs={12} sm={12} md={12} lg={5} xl={5}>
          <div className="d-flex divvv ">
            <h3 className="divvv">Oda Müsaitlik Durumu </h3>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggleDropdown}
              direction={"down"}
              className="roomsDropdown divvv"
            >
              <DropdownToggle color="success" style={{ fontWeight: 700 }} caret>
                Blok ve Kat Seçimi
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Yurt ismi</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                {/* <DropdownItem text>Dropdown Item Text</DropdownItem> */}
                {/* <DropdownItem disabled>Action (disabled)</DropdownItem> */}
                {/* <DropdownItem divider /> */}
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
        <Col className="divvv" xs={12} sm={12} md={12} lg={6} xl={6}>
          <Row
            style={{ justifyContent: "center" }}
            noGutters
            className="d-flex  "
          >
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <div className=" text-center mt-2  ">
                <h5>Erkek Boş</h5>
                <svg width="20" height="20" className="">
                  <rect
                    width="20"
                    height="20"
                    style={{ fill: "#bacfe1", opacity: 0.4 }}
                  />
                </svg>
              </div>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <div className=" text-center mt-2">
                <h5>Kadın Boş</h5>
                <svg width="20" height="20" className="">
                  <rect
                    width="20"
                    height="20"
                    style={{ fill: "cc8084", opacity: 0.4 }}
                  />
                </svg>
              </div>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <div className=" text-center mt-2 ">
                <h5>Erkek Dolu</h5>
                <svg width="20" height="20" className="">
                  <rect
                    width="20"
                    height="20"
                    style={{ fill: "47cbff", opacity: 1 }}
                  />
                </svg>
              </div>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <div className=" text-center mt-2 ">
                <h5>Kadın Dolu</h5>
                <svg width="20" height="20" className="">
                  <rect
                    width="20"
                    height="20"
                    style={{ fill: "#5c2928", opacity: 1 }}
                  />
                </svg>
              </div>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <div className=" text-center mt-2 ">
                <h5>Boş</h5>
                <svg width="20" height="20" className="">
                  <rect
                    width="20"
                    height="20"
                    style={{ fill: "a1a1a1", opacity: 1 }}
                  />
                </svg>
              </div>
            </Col>
          </Row>
        </Col>
        <hr className="hr mt-3" />

        <Row noGutters>
          <TablePagination
            component="div"
            count={rooms.length} // Update this to reflect the total number of rooms
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {rooms
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice the array based on pagination
            .map((room) => {
              const students = Array.isArray(room.student)
                    ? room.student
                    : JSON.parse(room.student);
                  // Count the number of students
                  const studentCount = students.length;
                  const isRoomFull = studentCount >= room.roomCapacity;
                  return(
              <Col
                className="divvv"
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                xxl={3}
              >
                <div className=" roomCard mx-3  ">
                  <Card inverse className="mb-5 my-2   " 
                  style={{
                    backgroundColor:
                      room.roomStatu === "Erkek Dolu"
                        ? "#47cbff"
                        : room.roomStatu === "Kadın Dolu"
                        ? "#5c2928"
                        : room.roomStatu === "Erkek Boş"
                        ? "#bacfe1"
                        : room.roomStatu === "Kadın Boş"
                        ? "#cc8084"
                        : "#a1a1a1", // Diğer boş durumlar için
                  }}
                  >
                    <Row>
                      <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                        <IoPeopleSharp
                          className="mx-2"
                          style={{ width: 50, height: 75 }}
                        />
                      </Col>
                      <Col noGutters xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}>
                        <CardTitle
                          className="mx-4"
                          style={{ textAlign: "end" }}
                          tag="h5"
                        >
                          Oda No : {room.roomNumber}
                        </CardTitle>
                        <CardTitle
                          className="mx-4 "
                          tag="h5"
                          style={{ textAlign: "end" }}
                        >
                          {room.roomCapacity} Kişilik Oda
                        </CardTitle>
                      </Col>
                    </Row>
                    <CardText className="svgb d-flex ">
                    {isRoomFull ? (
                              <h5 className="svgbH mt-2 mx-2 ">
                                Oda Full
                              </h5>
                            ) : (
                              <h5 className="svgbH mt-2 mx-2 ">
                                Güncel Kapasite: {room.roomCapacity}/
                                {studentCount}
                              </h5>
                            )}
                      {user ? (
                        <CButton
                          className=""
                          color="success"
                          onClick={() => setVisible(true)}
                        >
                          Rezervasyon Yap
                        </CButton>
                      ) : (
                        <CButton
                          className=""
                          color="success"
                          onClick={() => setVisible(true)}
                          disabled
                        >
                          Rezervasyon Yapmak İçin Giriş Yap
                        </CButton>
                      )}
                      {/* Warning Canvas */}
                      <COffcanvas
                        placement="bottom"
                        visible={visible}
                        onHide={() => setVisible(false)}
                      >
                        <COffcanvasHeader>
                          <COffcanvasTitle>Dikkat!</COffcanvasTitle>
                          <CCloseButton
                            className="text-reset"
                            onClick={() => setVisible(false)}
                          />
                        </COffcanvasHeader>
                        <COffcanvasBody className="text-center">
                          Öğrenci blgileriniz Yurt Yönetimine Yollanacaktır.{" "}
                          <br /> Rezervasyonu Onaylıyor musunuz? <br />
                          <Button color="success" className="mt-2">
                            Gönder
                          </Button>
                        </COffcanvasBody>
                      </COffcanvas>
                    </CardText>
                  </Card>
                </div>
              </Col>
              )
            })}
        </Row>
      </Row>

      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="pb-4">
            <h2 className="text-center">Yorum Ve Değerlendirmeler</h2>
            {user ? (
              <CButton
                className="w-25 CommentButton  "
                style={{}}
                color="success"
                onClick={() => setRezVisible(true)}
              >
                Yorum Yap
              </CButton>
            ) : (
              <CButton
                disabled
                className="w-25 CommentButton  "
                style={{}}
                color="success"
                onClick={() => setRezVisible(true)}
              >
                Yorum Yapmak için Giriş Yapmalısınız
              </CButton>
            )}

            <div className="comment mt-4 text-justify float-left">
              <img
                src="https://i.imgur.com/yTFUilP.jpg"
                alt=""
                className=" mx-1 rounded-circle"
                width="40"
                height="40"
              />
              <h4 className="text-white mx-2">Jhon Doe</h4>
              <span>- 20 October, 2018</span>
              <br />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Accusamus numquam assumenda hic aliquam vero sequi velit
                molestias doloremque molestiae dicta?
              </p>
            </div>
            <div class="text-justify darker mt-4 float-right">
              <img
                src="https://i.imgur.com/CFpa3nK.jpg"
                alt=""
                class="rounded-circle"
                width="40"
                height="40"
              />
              <h4 className="text-white mx-2">Rob Simpson</h4>
              <span>- 20 October, 2018</span>
              <br />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Accusamus numquam assumenda hic aliquam vero sequi velit
                molestias doloremque molestiae dicta?
              </p>
            </div>
          </Col>

          {/* Warning Canvas */}
          <COffcanvas
            placement="end"
            visible={commentvisible}
            onHide={() => setRezVisible(false)}
          >
            <COffcanvasHeader>
              <COffcanvasTitle>
                ! Lütfen Uygunsuz Kelimelerle Yorum Yapmayınız{" "}
              </COffcanvasTitle>
              <CCloseButton
                className="text-reset"
                onClick={() => setRezVisible(false)}
              />
            </COffcanvasHeader>
            <COffcanvasBody className="text-center">
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <form className="Commentform">
                  <div className="">
                    <h4 className="text-white">Yorum Yap</h4>
                    <label className="commentLabel" for="message"></label>
                    <textarea
                      name="msg"
                      id=""
                      msg
                      cols="100"
                      rows="15"
                      class="form-control"
                      placeholder="Yorum Yaz"
                    ></textarea>
                  </div>
                  <div className="">
                    <Button
                      className="mt-5"
                      color="success"
                      type="button"
                      id="post"
                      class="btn"
                    >
                      Paylaş
                    </Button>
                  </div>
                </form>
              </Col>
            </COffcanvasBody>
          </COffcanvas>
        </Row>
      </Container>
      {/* Room Properties shows */}
      {modal && (
        <div className="roomProps"
        color={colors.grey[500]}
        
        >
          <div className="overlay" onClick={toggle}>
            <div className="roomContent"
             backgroundColor={colors.grey[200]}
            >
              <h2>Single Room</h2>
              <p 
              color={colors.greenAccent[400]}       
 > 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                amet ratione natus facere rerum eos magnam, pariatur laudantium
                porro ipsum labore, dolorum at libero sequi sunt tenetur iusto
                maxime nemo ducimus dolores, cumque quos. Eaque tempore et
                repudiandae laudantium numquam nihil explicabo eum nobis
                deleniti. Non earum odio deleniti eligendi!
              </p>
              <button className="close-content" onClick={toggle}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DormReview;
