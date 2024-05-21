import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/header/Header";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  studentNo: yup.string().required("required"),
  phoneNumb: yup
    .string()
    .matches(phoneRegExp, "Telefon no geçerli değil")
    .required("required"),
  passaportNo: yup.string().required("required"),
  registerStatu: yup.string().required("required"),
  faculty: yup.string().required("required"),
  gender: yup.string().required("required"),
});
const cookies = new Cookies();

const dormIdFromCookie = cookies.get("jwt_auth");
const dormIdData = dormIdFromCookie ? jwtDecode(dormIdFromCookie) : null;
const dormId = dormIdData ? dormIdData.dormId : "";
console.log(dormId);
const initialValues = {
  firstName: "",
  lastName: "",
  studentNo: "",
  age: "",
  mail: "",
  phoneNumb: "",
  passaportNo: "",
  registerStatu: "",
  faculty: "",
  gender: "",
  dormId: dormId,
};

const Form = () => {
  const [students, setStudents] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("http://localhost:8800/dormstudents", values);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      resetForm();
    } catch (error) {
      console.log(error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
    setSubmitting(false);
  };

  return (
    <Box m="20px">
      <Header
        title="ÖĞRENCİ EKLE"
        subtitle="Öğrenci Ekleme, Güncelleme ve oda atama işlemi aşağıda yapılabilmektedir"
      />
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="40px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="İsim"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Soyisim"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Öğrenci No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.studentNo}
                name="studentNo"
                error={!!touched.studentNo && !!errors.studentNo}
                helperText={touched.studentNo && errors.studentNo}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Yaş"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mail"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mail}
                name="mail"
                error={!!touched.mail && !!errors.mail}
                helperText={touched.mail && errors.mail}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefon No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumb}
                name="phoneNumb"
                error={!!touched.phoneNumb && !!errors.phoneNumb}
                helperText={touched.phoneNumb && errors.phoneNumb}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Pasaport No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passaportNo}
                name="passaportNo"
                error={!!touched.passaportNo && !!errors.passaportNo}
                helperText={touched.passaportNo && errors.passaportNo}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Kayıt Durumu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerStatu}
                name="registerStatu"
                error={!!touched.registerStatu && !!errors.registerStatu}
                helperText={touched.registerStatu && errors.registerStatu}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fakülte"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.faculty}
                name="faculty"
                error={!!touched.faculty && !!errors.faculty}
                helperText={touched.faculty && errors.faculty}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                type="hidden"
                value={values.dormId}
                name="dormId"
                onChange={handleChange}
                sx={{display:"none"}}
              />

              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                sx={{ gridColumn: "span 4" }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="secondary" />}
                  label="Erkek"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="secondary" />}
                  label="Kadın"
                />
              </RadioGroup>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ height: 50, fontSize: 20, fontWeight: 600 }}
                disabled={isSubmitting}
              >
                Kaydet
              </Button>
            </Box>

            {showAlert && (
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
                severity="success"
              >
                Öğrenci Bilgileri Güncellendi
              </Alert>
            )}
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
                Bilgiler Güncellenemedi
              </Alert>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
