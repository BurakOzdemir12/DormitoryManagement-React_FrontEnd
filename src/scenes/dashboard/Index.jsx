import React from "react";
import Header from "../../Components/header/Header";
import {
  Box,
  useTheme,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import BarChart from "../../Components/BarChart";
import PieChart from "../../Components/PieChart";
import StatBox from "../../Components/StatBox";
import ProgressCircle from "../../Components/ProgressCircle";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NightShelterOutlinedIcon from "@mui/icons-material/NightShelterOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  return (
    <Box m="20px"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle={"Ana Sayfaya Hoşgeldiniz"} />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Rapor Oluştur
          </Button>
        </Box>
      </Box>
      {/* grids Charts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,minmax(0, 1fr))"
        gridAutoRows="140px"
        gap="20px"
        sx={{
          "& > div ": { gridColumn: isNonMobile ? undefined : "span 12" },
        }}
      >
        {/* Row 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="800"
            subtitle="Toplam Kapasite "
            progress="0.75"
            increase="+14%"
            icon={
              <NightShelterOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="25"
            subtitle="Okunmamış Yorum  "
            progress="0.75"
            increase=" +14%"
            icon={
              <ChatOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="25"
            subtitle="Bekleyen Rezervasyon"
            progress="0.75"
            increase="+14%"
            icon={
              <PendingActionsOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="25"
            subtitle="Okunmamış Yorum  "
            progress="0.75"
            increase="+14%"
            icon={
              <ChatOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* Row 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          sx={{
            width: "100%",
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Yurt Müsaitlik Dağılımı
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.grey[100]}
              >
                {/* $15.485,45 */}
              </Typography>
            </Box>
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "30px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          </Box>

          <Box height="350px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        {/* Rezervations*/}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          width="100%"
          height="133%"
          mt={4}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Rezervasyon Listesi
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[300]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.greenAccent[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box backgroundColor={colors.greenAccent[500]}
              p="5px 10px" borderRadius="4px"
              >
                ${transaction.cost }
              </Box>
            </Box>
          ))}
        </Box>
        </Box>


    </Box>
  );
};

export default Index;
