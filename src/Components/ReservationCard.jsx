import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/system";
import {
  Button,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "universal-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ReservationCard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reservations, setReservations] = useState([]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const cookies = new Cookies();
  const isMobile = useMediaQuery("(min-width:820px)");
  const isComputer = useMediaQuery("(max-width:1440px)");
  const dormIdFromCookie = cookies.get("jwt_auth");
  const dormIdData = dormIdFromCookie ? jwtDecode(dormIdFromCookie) : null;

  useEffect(() => {
    const fetchMatchedReservation = async () => {
      if (!dormIdData || !dormIdData.dormId) {
        console.error("Error: Dorm ID is not available");
        return;
      }

      try {
        // Rezervasyonları çek ve filtrele
        const res = await axios.get("http://localhost:8800/reservations");
        const filteredReservations = res.data.filter(
          (reservation) => reservation.dormId === dormIdData.dormId
        );

        // Benzersiz roomId'leri çıkar
        const uniqueRoomIds = [...new Set(filteredReservations.map(r => r.roomId))];
        
        // Her roomId için oda bilgilerini çek
        const roomRequests = uniqueRoomIds.map(roomId =>
          axios.get(`http://localhost:8800/rooms/${roomId}`)
        );
        
        const roomResponses = await Promise.all(roomRequests);
        const roomsData = roomResponses.map(response => response.data);
        
        // Rezervasyonları oda bilgileriyle birleştir
        const reservationsWithRoomData = filteredReservations.map(reservation => {
          const roomData = roomsData.find(room => room.id === reservation.roomId);
          return { ...reservation, roomNumber: roomData ? roomData.roomNumber : null };
        });

        setReservations(reservationsWithRoomData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatchedReservation();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8800/verifyres/${id}`);
      const updatedReservations = reservations.map(reservation => {
        if (reservation.id === id) {
          return { ...reservation, isVerified: true };
        } else {
          return reservation;
        }
      });
      setReservations(updatedReservations);
      window.location.reload();

    } catch (error) {
      console.error("Error approving reservation:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/deleteres/${id}`);
      const updatedReservations = reservations.filter(reservation => reservation.id !== id);
      setReservations(updatedReservations);
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <Box 
      display="grid"
      gridTemplateColumns="repeat(12,minmax(0, 1fr))"
      gridAutoRows="140px"
      gap="20px"
      sx={{
        "& > div ": { gridColumn: isMobile ? undefined : "span 12" },
        "& > div": { gridColumn: isComputer ? undefined : "span 2" },
      }}
    >
      {reservations
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((reservation) => (
          <Box
            key={reservation.id}
            height="auto"
            gridRow="span 3"
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="inline-block"
            justifyContent="center"
          >
            <CardContent sx={{ justifySelf: "center", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: 24, textAlign: "center" }}
                gutterBottom
              >
                Öğrenci Bilgileri
              </Typography>
              <Typography display="flex" mt={3} variant="h5" component="div">
                Adı - Soyadı:{" "}
                <Typography mx={1} mt={0.2}>
                  {reservation.firstName}: {reservation.lastName}
                </Typography>
              </Typography>
              <Typography display="flex" mt={3} variant="h5" component="div">
                Öğrenci Numarası:{" "}
                <Typography mx={1} mt={0.2}>
                  {reservation.studentNo}
                </Typography>
              </Typography>
              <Typography display="flex" mt={3} variant="h5" component="div">
                Fakülte:{" "}
                <Typography mx={1} mt={0.2}>
                  {reservation.faculty}
                </Typography>
              </Typography>
              <Typography display="flex" mt={3} variant="h5" component="div">
                Telefon No:{" "}
                <Typography mx={1} mt={0.2}>
                  {reservation.phoneNumb}
                </Typography>
              </Typography>
              <Typography display="flex" mt={3} variant="h5" component="div">
                Cinsiyet:{" "}
                <Typography mx={1} mt={0.2}>
                  {reservation.gender}
                </Typography>
              </Typography>
              <Typography display="flex" mt={3} variant="h5" component="div">
                Oda Numarası:{" "}
                <Typography mx={1} mt={0.2}>
                  {reservation.roomNumber}
                </Typography>
              </Typography>
            </CardContent>
            <Box
              sx={{
                justifyContent: "center",
                display: "block",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={reservation.isVerified === 1}
                onClick={() => handleApprove(reservation.id)}
                sx={{
                  width: {
                    xs: "40%",
                    sm: "39%",
                    md: "38%",
                    lg: "43%",
                    xl: "38%",
                  },
                  height: 50,
                  fontSize: 17,
                  fontWeight: 600,
                  mx: 2,
                  letterSpacing: 1,
                }}
                color="sucessc"
              >
                Onayla
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={() => handleDelete(reservation.id)}
                sx={{
                  mx: 1,
                  width: {
                    xs: "40%",
                    sm: "39%",
                    md: "38%",
                    lg: "43%",
                    xl: "38%",
                  },
                  height: 50,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
                color="errorc"
              >
                <DeleteIcon fontSize="medium" /> Reddet
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  justifySelf: "center",
                  mt: 3,
                  mx: 2,
                  height: 50,
                  fontSize: 12,
                  fontWeight: 800,
                  width: {
                    xs: "39%",
                    sm: "39%",
                    md: "38%",
                    lg: "43%",
                    xl: "38%",
                  },
                  letterSpacing: 0.2,
                }}
                color="sucessc"
              >
                Öğrenciyi Odaya Ata
              </Button>
              <Button
                type="button"
                variant="outlined"
                sx={{
                  justifySelf: "center",
                  mt: 3,
                  mx: 1,
                  height: 50,
                  fontSize: 11.1,
                  fontWeight: 800,
                  width: {
                    xs: "39%",
                    sm: "39%",
                    md: "38%",
                    lg: "43%",
                    xl: "38%",
                  },
                  letterSpacing: 0.2,
                }}
                color="warning"
              >
                {reservation.isVerified === 1 ? (
                  <>Rezervasyon Onaylandi</>
                ) : (
                  <>Rezervasyon Durumu</>
                )}
              </Button>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default ReservationCard;
