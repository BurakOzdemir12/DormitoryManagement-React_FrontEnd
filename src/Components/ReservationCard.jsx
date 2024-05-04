import React from "react";
import { Box, useMediaQuery } from "@mui/system";
import {
  Button,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const ReservationCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(min-width:820px)");
  const isComputer = useMediaQuery("(max-width:1440px)");

  return (
    <Box //Main Grid
      display="grid"
      gridTemplateColumns="repeat(12,minmax(0, 1fr))"
      gridAutoRows="140px"
      gap="20px"
      sx={{
        "& > div ": { gridColumn: isMobile ? undefined : "span 12" },
        "& > div": { gridColumn: isComputer ? undefined : "span 2" },
      }}
    >
      {/* Row 1 */}
      <Box
        height="auto"
        gridRow="span 3"
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="inline-block"
        // alignItems="center"
        justifyContent="center"
      >
        <CardContent sx={{justifySelf:"center",alignItems:"center"}}>
          <Typography sx={{ fontSize: 24 ,textAlign:"center"}} gutterBottom>
            Öğrenci Bilgileri
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Adı - Soyadı:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Name
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Öğrenci Numarası:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              2000190
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Fakülte:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Name
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Telefon No:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              01541058
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Cinsiyet:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Erkek
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
            sx={{
              width: {
                xs: "40%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
              },
              height: 50,
              fontSize: 17,
              fontWeight: 600,
              // width: "40%",

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
            sx={{
              mx: 1,
              width: {
                xs: "40%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
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
                xxl: "",
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
              fontSize: 12,
              fontWeight: 800,
              width: {
                xs: "39%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
              },

              letterSpacing: 0.2,
            }}
            color="warning"
          >
            Rezervasyon Durumu
          </Button>
        </Box>
      </Box>

      <Box
        height="auto"
        gridRow="span 3"
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="inline-block"
        // alignItems="center"
        justifyContent="center"
      >
        <CardContent sx={{justifySelf:"center",alignItems:"center"}}>
          <Typography sx={{ fontSize: 24 ,textAlign:"center"}} gutterBottom>
            Öğrenci Bilgileri
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Adı - Soyadı:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Name
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Öğrenci Numarası:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              2000190
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Fakülte:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Name
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Telefon No:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              01541058
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Cinsiyet:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Erkek
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
            sx={{
              width: {
                xs: "40%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
              },
              height: 50,
              fontSize: 17,
              fontWeight: 600,
              // width: "40%",

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
            sx={{
              mx: 1,
              width: {
                xs: "40%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
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
                xxl: "",
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
              fontSize: 12,
              fontWeight: 800,
              width: {
                xs: "39%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
              },

              letterSpacing: 0.2,
            }}
            color="warning"
          >
            Rezervasyon Durumu
          </Button>
        </Box>
      </Box>
      <Box
        height="auto"
        gridRow="span 3"
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="inline-block"
        // alignItems="center"
        justifyContent="center"
      >
        <CardContent sx={{justifySelf:"center",alignItems:"center"}}>
          <Typography sx={{ fontSize: 24 ,textAlign:"center"}} gutterBottom>
            Öğrenci Bilgileri
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Adı - Soyadı:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Name
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Öğrenci Numarası:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              2000190
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Fakülte:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Name
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Telefon No:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              01541058
            </Typography>
          </Typography>
          <Typography display="flex" mt={3} variant="h5" component="div">
            Cinsiyet:{" "}
            <Typography mx={1} mt={0.2}>
              {" "}
              Erkek
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
            sx={{
              width: {
                xs: "40%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
              },
              height: 50,
              fontSize: 17,
              fontWeight: 600,
              // width: "40%",

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
            sx={{
              mx: 1,
              width: {
                xs: "40%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
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
                xxl: "",
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
              fontSize: 12,
              fontWeight: 800,
              width: {
                xs: "39%",
                sm: "39%",
                md: "38%",
                lg: "43%",
                xl: "38%",
                xxl: "",
              },

              letterSpacing: 0.2,
            }}
            color="warning"
          >
            Rezervasyon Durumu
          </Button>
        </Box>
      </Box>

      
    </Box>
  );
};

export default ReservationCard;
