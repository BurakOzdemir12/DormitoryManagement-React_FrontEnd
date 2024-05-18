import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

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

const UpdateForm = () => {
  const [students, setStudents] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const studentId = location.pathname.split("/")[2];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setshowErrorAlert] = useState(false);

  useEffect(() => {
    const fetchStudent = async (id) => {
      try {
        const res = await axios.get(`http://localhost:8800/students/${id}`);
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudent(studentId);
  }, [studentId]);

  const handleChange = (e) => {
    setStudents((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.put(`http://localhost:8800/students/${studentId}`, values);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/students");
      }, 2000);
    } catch (error) {
      console.log(error);
      setshowErrorAlert(true);
      setTimeout(() => {
        setshowErrorAlert(false);
      }, 2000);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="ÖĞRENCİ EKLE"
        subtitle="Öğrenci Ekleme, Güncelleme ve oda atama işlemi aşağıda yapılabilmektedir"
      />
      <Formik
        enableReinitialize
        initialValues={students}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange: formikHandleChange,
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
                "& > div ": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="İsim"
                placeholder="İsim"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.firstName || ""}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  gridColumn: "span 2",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 0.4,
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Soyisim"
                placeholder="Soyisim"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.lastName || ""}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  gridColumn: "span 2",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 1,
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Öğrenci No"
                placeholder="Öğrenci No"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.studentNo || ""}
                name="studentNo"
                error={!!touched.studentNo && !!errors.studentNo}
                helperText={touched.studentNo && errors.studentNo}
                sx={{
                  gridColumn: "span 1",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 0.4,
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Yaş"
                placeholder="Yaş"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.age || ""}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{
                  gridColumn: "span 1",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 0.4,
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Mail"
                placeholder="Mail"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.mail || ""}
                name="mail"
                error={!!touched.mail && !!errors.mail}
                helperText={touched.mail && errors.mail}
                sx={{
                  gridColumn: "span 2",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 0.4,
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefon No"
                placeholder="Telefon No"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.phoneNumb || ""}
                name="phoneNumb"
                error={!!touched.phoneNumb && !!errors.phoneNumb}
                helperText={touched.phoneNumb && errors.phoneNumb}
                sx={{
                  gridColumn: "span 2",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 0.4,
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Pasaport No"
                placeholder="Pasaport No"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.passaportNo || ""}
                name="passaportNo"
                error={!!touched.passaportNo && !!errors.passaportNo}
                helperText={touched.passaportNo && errors.passaportNo}
                sx={{
                  gridColumn: "span 2",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 0.4,
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Kayıt Durumu"
                placeholder="Kayıt Durumu"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.registerStatu || ""}
                name="registerStatu"
                error={!!touched.registerStatu && !!errors.registerStatu}
                helperText={touched.registerStatu && errors.registerStatu}
                sx={{
                  gridColumn: "span 1",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 0.4,
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fakülte"
                placeholder="Fakülte"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.faculty || ""}
                name="faculty"
                error={!!touched.faculty && !!errors.faculty}
                helperText={touched.faculty && errors.faculty}
                sx={{
                  gridColumn: "span 1",
                  "& input::placeholder": {
                    textAlign: "right",
                    opacity: 1,
                    fontSize: 18,
                    m: 0.4,
                  },
                }}
              />
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  formikHandleChange(e);
                }}
                value={values.gender || ""}
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="secondary" />}
                  label="Erkek"
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="secondary" />}
                  label="Kadın"
                  sx={{ gridColumn: "span 2" }}
                />
              </RadioGroup>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ height: 50, fontSize: 20, fontWeight: 600, width: "100" }}
                disabled={isSubmitting}
              >
                Kaydet
              </Button>
            </Box>
            {errors.submit && (
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
                {errors.submit}
              </Alert>
            )}
          </form>
        )}
      </Formik>
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
    </Box>
  );
};

export default UpdateForm;
