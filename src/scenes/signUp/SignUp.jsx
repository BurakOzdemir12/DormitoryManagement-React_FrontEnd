import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import bgimg from "../../Components/images/emu.png";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { Alert, CircularProgress } from "@mui/material";

// Import the schema from the first form
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const userSchema = yup.object().shape({
    firstName: yup.string().required("Gerekli"),
    lastName: yup.string().required("Gerekli"),
    email: yup
      .string()
      .email("Geçerli bir email adresi giriniz")
      .matches(
        /^[A-Z0-9._%+-]+@emu\.edu\.tr$/i,
        "Email must be in the format @emu.edu.tr"
      )
      .required("Gerekli"),
    repassword: yup.string().required("Gerekli"),
    password: yup.string().required("Gerekli"),
    // phoneNumb: yup
    //   .string()
    //   .matches(phoneRegExp, "Telefon no geçerli değil")
    //   .required("required"),
    passaportNo: yup.string().required("Gerekli"),
  });
  
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    passaportNo: "",
    password: "",
    repassword: "",
  };
  
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
  
  const SignUp = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [showProgress, setShowProgress] = useState(false);
  
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const handleSubmit = async (values, { setSubmitting }) => {
      if (values.password !== values.repassword) {
        setPasswordError("Girilen Şifreler Aynı Değil");
        setSubmitting(false);
        return;
      }
  
      try {
        const studentResponse = await axios.get("http://localhost:8800/students");
        const students = studentResponse?.data;
        // console.log(students)
        const enteredEmail = values.email;
        const enteredPassportNo = values.passaportNo;
        const isStudent = students.some(student => 
          student.email === enteredEmail && student.passaportNo === enteredPassportNo
        );  

        if (isStudent) {
          const userResponse = await axios.post("http://localhost:8800/users", {
            username: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            passaportNo: values.passaportNo,
          });
  
          setShowProgress(true);
          setTimeout(() => {
            setShowProgress(false);
            navigate("/verification", {
              state: {
                username: values.email,
                verificationCode: userResponse.data.verificationCode,
              },
            });
          }, 2000);
        } else {
          setShowErrorAlert(true);
          setTimeout(() => {
            setShowErrorAlert(false);
          }, 2000);
          setError(true);
        }
      } catch (error) {
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 2000);
        setError(true);
      }
  
      setSubmitting(false);
    };
  
    return (
      <Box>
        <Grid container component="main" sx={{ height: "auto" }}>
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ backgroundColor: colors.primary[400] }}
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
                Kayıt Ol
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={userSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleChange,
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  setFieldTouched,
                }) => (
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label="Your EMU Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("password", e.target.value);
                        setFieldTouched("password", true, false);
                        if (
                          values.repassword &&
                          e.target.value !== values.repassword
                        ) {
                          setPasswordError("Girilen Şifreler Aynı Değil");
                        } else {
                          setPasswordError("");
                        }
                      }}
                      onBlur={handleBlur}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                    <TextField
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("repassword", e.target.value);
                        setFieldTouched("repassword", true, false);
                        if (
                          values.password &&
                          e.target.value !== values.password
                        ) {
                          setPasswordError("Girilen Şifreler Aynı Değil");
                        } else {
                          setPasswordError("");
                        }
                      }}
                      onBlur={handleBlur}
                      margin="normal"
                      required
                      fullWidth
                      name="repassword"
                      label="Parola Tekrar"
                      type="password"
                      id="repassword"
                      autoComplete=""
                      error={!!touched.repassword && !!errors.repassword}
                      helperText={touched.repassword && errors.repassword}
                    />
                    {passwordError && (
                      <Typography color="error" variant="body2">
                        {passwordError}
                      </Typography>
                    )}
                    <TextField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="İsim"
                      name="firstName"
                      autoComplete="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Soyisim"
                      name="lastName"
                      autoComplete="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                    />
                    <TextField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      required
                      fullWidth
                      id="passaportNo"
                      label="Your Passaport or ID Card Number"
                      name="passaportNo"
                      autoComplete="passaportNo"
                      error={!!touched.passaportNo && !!errors.passaportNo}
                      helperText={touched.passaportNo && errors.passaportNo}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        background: colors.greenAccent[400],
                        color: colors.primary[900],
                        "&:hover": {
                          backgroundColor: colors.greenAccent[500],
                          color: colors.primary[300],
                        },
                      }}
                      disabled={isSubmitting}
                    >
                      Kayıt ol
                    </Button>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {showProgress && (
                        <CircularProgress sx={{ marginRight: 1 }} />
                      )}{" "}
                      {/* CircularProgress */}
                      {showProgress && (
                        <Typography variant="h5">
                          Doğrulama Sayfasına Yönlendiriliyorsunuz
                        </Typography>
                      )}{" "}
                      {/* Typography */}
                    </Box>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          <Typography color={colors.primary[100]}></Typography>
                        </Link>
                      </Grid>
                      <Grid item></Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
  
                    {showErrorAlert && (
                      <Alert
                        variant="filled"
                        sx={{
                          position: "fixed",
                          bottom: 20,
                          right: 20,
                          fontSize: 25,
                          gridColumn: "span 4",
                          width: "30%",
                        }}
                        severity="error"
                      >
                        Girmiş Olduğunuz Bilgilerle Bir Öğrenci Bulunamadı
                      </Alert>
                    )}
                  </Box>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default SignUp;