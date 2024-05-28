import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useTheme } from "@mui/material";
import bgimg from "../../Components/images/emu.png";
import roomimage1 from "../../Components/images/dorms/roomphoto1.jpg";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Navi from "../../Components/nav/Navi";
import { tokens, useMode } from "../../theme";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const defaultTheme = createTheme();

function SignInSide() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const resfreshToken = async () => {
    try {
      const res = await axios.post("/refresh", { token: user.resfreshToken });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      cookies.set("jwt_auth", res.data.accessToken, { path: "/" });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwtDecode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await resfreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //login
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      const res = await axios.post("/login", { username, password });

      setUser(res.data);
      cookies.set("jwt_auth", res.data.accessToken, { path: "/" }); // localStorage.setItem("token", res.data.accessToken);
      window.location.reload()

       navigate(res.data.isAdmin ? "/dashboard" : "/home");
       window.location.reload()
    } catch (error) {
      setError(true);

    }
  };
  // const [theme, colorMode] = useMode();
  return (
    <Box>
      {user && <Navi user={user} />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgimg})`,
            backgroundRepeat: "no-repeat",

            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        sx={{ backgroundColor:colors.primary[400],}}
        >
          <Box
            sx={{
             
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography color={colors.grey[100]} component="h1" variant="h5">
              Öğrenci Girişi
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => setUserName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {error && (
                <Typography color="error" variant="h5">
                  Email veya Şifre hatalıdır lütfen tekrar deneyiniz.
                </Typography>
              )}
              <FormControlLabel
              sx={{display:"none"}}
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                className="btnsbmt"
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: colors.greenAccent[400],
                  color: colors.grey[900],
                  '&:hover': {
                    backgroundColor: colors.greenAccent[500],
                    color: colors.grey[100],
                  },
                }}
              >
                Giriş Yap
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {/* <Typography color={colors.primary[100]}>
                      Forgot password?
                    </Typography> */}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="">
                   <Typography variant="h3" color={colors.grey[100]}>Öğrencisin ve Hesabın Yok mu? Kayıt Ol</Typography> 
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default SignInSide;
