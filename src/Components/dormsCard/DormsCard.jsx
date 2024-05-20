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
import React, { useEffect, useState } from "react";

import longson from "../../Components/images/dorms/longson.jpg";
import { tokens } from "../../theme";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
const DormsCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Fetch Rooms
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8800/dormfeature");

        setDorms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);
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
        {dorms.map((dorm) => {
          return (
            <Grid xs={12} sm={6} md={6} lg={3} xl={4} xxl={4}>
              <Item>
              <Link style={{textDecoration:"none"}} to={`/Dorms/${1}`}>
                <Card
                  sx={{ maxWidth: "100%", minHeight: 500 }}
                  key={dorm.dormId}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="280"
                      src={longson}
                      alt="green iguana"
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
                        Adres:{""} {dorm.dormAdress}
                        <br />
                        İletişim:{""} {dorm.dormContact}
                        <br />
                        <Typography
                          variant="h4"
                          color="text.secondary"
                          textAlign={"end"}
                        >
                          <Typography
                            variant="h3"
                            color="text.primary"
                            textAlign={"end"}
                            mx={5}
                          >
                            {" "}
                            Fiyatlar
                          </Typography>
                          <br /> Tek kişilik Oda: 458$
                          <br />
                          Çift Kişilik Oda: 241$
                        </Typography>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={`/Dorms/${1}`}>

                    <Button
                      size="large"
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: colors.greenAccent[600],
                        color: colors.grey[100],
                        "&:hover": {
                          backgroundColor: colors.greenAccent[400],
                          color: colors.primary[900],
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
          );
        })}
      </Grid>

      {/* {dorms.map((dorm) => {
              return(
          <Card sx={{ maxWidth: 345, minHeight: 500 }}
          key={dorm.dormId}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="280"
                src={longson}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dorm.dormName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
          )
        })} */}
    </Box>
  );
};

export default DormsCard;
