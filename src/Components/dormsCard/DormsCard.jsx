
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const DormsCard = ({search,selectedCategory,priceRange }) => {
  const theme = useTheme();
  const [dorms, setDorms] = useState([]);
  const [roomProps, setRoomProps] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/dormfeature`);
        setDorms(response.data);
      } catch (error) {
        console.error("Error fetching dorms:", error);
      }
    };

    const fetchRoomProps = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/roomprops`);
        setRoomProps(response.data);
      } catch (error) {
        console.error("Error fetching room properties:", error);
      }
    };

    fetchDorms();
    fetchRoomProps();
  }, []);

  useEffect(() => {
    if (dorms.length && roomProps.length) {
      const combined = dorms.map((dorm) => {
        const rooms = roomProps.filter((room) => room.dormId === dorm.dormId);
        return { ...dorm, rooms };
      });
      setCombinedData(combined);
    }
  }, [dorms, roomProps]);

  const filterDorms = (dorm) => {
    if (!selectedCategory) {
      return true;
    }
    
 return dorm.dormCategory === selectedCategory;  };


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {combinedData.filter((item)=> {
          return  search===''
          ? item 
          :item.dormName.toLowerCase().includes(search.toLowerCase());
        }).filter(filterDorms)
        .map((dorm) => (
          <Grid key={dorm.dormId} xs={12} sm={6} md={6} lg={3} xl={4} xxl={4}>
            <Item>
              <Link
                style={{ textDecoration: "none" }}
                to={`/Dorms/${dorm.dormId}`}
              >
                <Card sx={{ maxWidth: "100%", minHeight: 500 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="280"
                      src={`http://localhost:8800/images/${dorm.dormImage}`}
                      alt={dorm.dormName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="div">
                        {dorm.dormName}
                      </Typography>
                      <Typography
                        sx={{ textAlign: "left" }}
                        variant="h4"
                        color="text.secondary"
                      >
                        Adres: {dorm.dormAdress}
                        <br />
                        İletişim: {dorm.dormContact}
                        <br />
                        <Typography variant="h4" color="text.secondary">
                          <Box
                            
                            sx={{ textAlign: "end", my: 1 }}
                          >
                            <Typography
                              variant="h3"
                              color="text.primary"
                              textAlign={"end"}
                              mx={5}
                            >
                              Fiyatlar
                            </Typography>
                            {dorm.rooms.map((room) => (
                              <Typography
                              key={dorm.dormId}
                                variant="h4"
                                color="text.secondary"
                                textAlign={"end"}
                              >
                                {room.roomType}: {room.roomPrice}
                              </Typography>
                            ))}
                          </Box>
                        </Typography>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={`/Dorms/${dorm.dormId}`}>
                      <Button
                        size="large"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: theme.palette.success.main,
                          color: theme.palette.common.white,
                          "&:hover": {
                            backgroundColor: theme.palette.success.dark,
                            color: theme.palette.common.white,
                          },
                        }}
                      >
                        YURT SAYFASINA GİT
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Link>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DormsCard;
