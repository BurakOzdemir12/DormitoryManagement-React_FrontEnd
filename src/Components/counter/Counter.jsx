import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react'
import ScrollTrigger from "react-scroll-trigger";
import { Col, Row } from 'reactstrap';
import CountUp from "react-countup";
import  "./counter.css"
const Counter = () => {
       const [counterOn, setCounterOn] = useState(false);

  return (
    <Box>
    {/* Counter */}
    <ScrollTrigger
    onEnter={() => setCounterOn(true)}
    onExit={() => setCounterOn(false)}
  >
    <Container >
      <Row noGutters>
        <Col style={{alignContent:"center",}}  xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography
          sx={{fontSize:40,fontWeight:300}}
          variant='h3'
            className="mt-5 "
          >
            KAMPÜS HAYATINA HOŞGELDİNİZ
          </Typography>
          <Typography variant='h3' sx={{}} className="mt-3 " >
            Haydi Sen de Kampüslü ol{" "}
          </Typography>
        </Col>
        <Col className="mt-4" xs={12} sm={12} md={6} lg={5} xl={5}>
          <Row noGutters>
            <Col xs={3} sm={3} md={6} lg={6} xl={6}>
              <div  id="counters_1">
                <div class="cont">
                  <div class="row">
                    <div className="counter">
                      {/* <img className="counterImage"></img> */}
                      {counterOn && (
                        <CountUp
                          start={0}
                          end={18232}
                          duration={3}
                          delay={0}
                        />
                      )}
                      <p class="sign">+</p>
                    </div>
                    
                  </div>
                  <div class="row">
                    <div class="text">Daü'lü Öğrencimiz</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={3} sm={3} md={6} lg={6} xl={6}>
              <div id="counters_1">
                <div class="cont ">
                  <div class="row ">
                    <div class="counter ">
                      {counterOn && (
                        <CountUp
                          start={0}
                          end={7124}
                          duration={3}
                          delay={0}
                        />
                      )}
                      <p class="sign">+</p>
                    </div>
                    
                  </div>
                  <div class="row">
                    <div class="text">Yurtlar'da Barınan Öğrenciler</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={3} sm={3} md={6} lg={6} xl={6}>
              <div id="counters_1">
                <div class="cont">
                  <div class="row">
                    <div class="counter">
                      {counterOn && (
                        <CountUp
                          start={0}
                          end={4526}
                          duration={3}
                          delay={0}
                        />
                      )}
                      <p class="sign">+</p>
                    </div>
                    
                  </div>
                  <div class="row">
                    <div class="text">Personel</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={3} sm={3} md={6} lg={6} xl={6}>
              <div id="counters_1">
                <div class="cont">
                  <div class="row">
                    <div class="counter num">
                      {counterOn && (
                        <CountUp
                          start={0}
                          end={37}
                          duration={2}
                          delay={0}
                        />
                      )}
                      <p class="sign">+</p>
                    </div>
                    
                  </div>
                  <div class="row">
                    <div class="text">Yıldır Hizmetinizdeyiz</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </ScrollTrigger>
  </Box>
  )
}

export default Counter