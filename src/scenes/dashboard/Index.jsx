import React, { useState } from "react";
import Header from "../../Components/header/Header";
import {
  Box,
  useTheme,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  TablePagination,
  Badge,
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
import {
  CButton,
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";
import { Card, CardText, CardTitle, Col, Row } from "reactstrap";
import { IoPeopleSharp } from "react-icons/io5";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Delete, Edit, Opacity, Preview } from "@mui/icons-material";

/// menu button
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
/////
const occupancy = [
  {
    person: 1,
    color: "danger",
  },
  { person: 2, color: "primary" },
  { person: 1, color: "danger" },
  { person: 3, color: "secondary" },
  { person: 1, color: "primary" },
];
const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const occupancy = [
    {
      person: 1,
      color: "danger",
    },
    { person: 2, color: "danger " },
    { person: 1, color: "danger" },
    { person: 3, color: "secondary" },
    { person: 1, color: "primary" },
    { person: 3, color: "primary" },
    { person: 1, color: "primary" },
    { person: 1, color: "primary" },
    { person: 2, color: "secondary" },
    { person: 1, color: "primary" },
    { person: 1, color: "primary" },
    { person: 1, color: "primary" },
    { person: 1, color: "primary" },
    { person: 1, color: "primary" },
    { person: 1, color: "primary" },
    { person: 1, color: "primary" },
  ];
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
  //Rooms Menu button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  const [visible, setVisible] = useState(false);

  const isNonMobile = useMediaQuery("(min-width:768px)");
  return (
    <Box m="20px">
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
              <IconButton sx={{ m: 0 }}>
                <Badge color="secondary" badgeContent={28}>
                  <PendingActionsOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
                  />
                </Badge>
              </IconButton>
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
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
        {/* Room List */}

        <Box
          gridColumn="span 12"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
          width="100%"
          height="100%"
          mt={5}
          mb={5}
          display="flex"
          alignItems="start"
          justifyContent="center"
        >
          <Box>
            <Header title="Güncel Odalar" />

            <TablePagination
              component="div"
              count={occupancy.length} // Update this to reflect the total number of rooms
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Row style={{ alignItems: "center", marginLeft: "4%" }} noGutters>
              {occupancy
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice the array based on pagination
                .map((ocp) => (
                  <Col
                    className="divvv"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={2}
                    xxl={3}
                  >
                    <div className=" roomCard  ">
                      <Card inverse className="mb-5 my-2   " color={ocp.color}>
                        <Row>
                          <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                            <Button
                              id="demo-customized-button"
                              aria-controls={
                                open ? "demo-customized-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              variant="contained"
                              disableElevation
                              onClick={handleClick}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              Ayarlar
                            </Button>
                            <StyledMenu
                              id="demo-customized-menu"
                              MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose} disableRipple>
                                <EditIcon />
                                Güncelle
                              </MenuItem>
                              <MenuItem onClick={handleClose} disableRipple>
                                <DeleteIcon />
                                Sil
                              </MenuItem>
                              {/* <MenuItem onClick={handleClose} disableRipple>
                                <FileCopyIcon />
                                Duplicate
                              </MenuItem>
                              <Divider sx={{ my: 0.5 }} />
                              <MenuItem onClick={handleClose} disableRipple>
                                <ArchiveIcon />
                                Archive
                              </MenuItem>
                              <MenuItem onClick={handleClose} disableRipple>
                                <MoreHorizIcon />
                                More
                              </MenuItem> */}
                            </StyledMenu>
                            <IoPeopleSharp
                              className="mx-2"
                              style={{ width: 50, height: 75 }}
                            />
                          </Col>
                          <Col
                            noGutters
                            xs={9}
                            sm={9}
                            md={9}
                            lg={9}
                            xl={9}
                            xxl={9}
                          >
                            <CardTitle
                              className="mx-4"
                              style={{ textAlign: "end" }}
                              tag="h5"
                            >
                              Oda No : {ocp.person}
                            </CardTitle>
                            <CardTitle
                              className="mx-4 "
                              tag="h5"
                              style={{ textAlign: "end" }}
                            >
                              {ocp.person} Kişilik Oda
                            </CardTitle>
                          </Col>
                        </Row>
                        <CardText className="svgb d-flex ">
                          <h5 className="svgbH mt-2 mx-2 ">
                            Güncel Kapasite: 2/{ocp.person}
                          </h5>
                          {/* <CButton
                            className=""
                            color="success"
                            onClick={() => setVisible(true)}
                          >
                            Rezervasyon Yap
                          </CButton> */}

                          {/* Warning Canvas */}
                          {/* <COffcanvas
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
                          </COffcanvas> */}
                        </CardText>
                      </Card>
                    </div>
                  </Col>
                ))}
            </Row>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
