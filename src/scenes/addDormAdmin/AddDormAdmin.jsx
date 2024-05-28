import React from "react";
import {
  Box,
  Button,
  TextField,
  Input,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../Components/header/Header";
import axiosInstance from "../../data/axiosInstance";

// Validation schema
const userSchema = yup.object().shape({
  dormName: yup.string().required("Yurt adı gerekli"),
  dormContact: yup.string().required("Telefon numarası gerekli"),
  dormImage: yup.mixed().required("Yurt görseli gerekli"),
  username: yup.string().required("Kullanıcı adı gerekli"),
  password: yup.string().required("Şifre gerekli"),
  firstName: yup.string().required("Ad gerekli"),
  lastName: yup.string().required("Soyad gerekli"),
});

const AddDormAdmin = () => {
    const isNonMobile = useMediaQuery("(min-width:720px)");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  
    const handleSubmit = async (values, { resetForm }) => {
      try {
        // Dorm bilgilerini kaydet
        const dormFormData = new FormData();
        dormFormData.append("dormName", values.dormName);
        dormFormData.append("dormContact", values.dormContact);
        dormFormData.append("dormImage", values.dormImage);
  
        const dormResponse = await axiosInstance.post(
          "/dormfeature",
          dormFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        const dormId = dormResponse.data.insertId;
  
        // Yeni kullanıcıyı kaydet
        await axiosInstance.post("/dormadminadd", {
          username: values.username,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          dormId: dormId,
        });
  
        setSnackbarMessage("Yurt yöneticisi başarıyla eklendi!");
        setSnackbarOpen(true);
        resetForm();
      } catch (error) {
        console.error("Error adding dorm admin:", error);
        setSnackbarMessage("Bir hata oluştu, lütfen tekrar deneyin.");
        setSnackbarOpen(true);
      }
    };
  
    return (
      <Box m="20px">
        <Header
          title="Yurt Yöneticisi Ekleme"
          subtitle="Yurt Yöneticisinin bilgilerini buradan girebilirsiniz ve ekleyebilirsiniz."
        />
        <Formik
          initialValues={{
            dormName: "",
            dormContact: "",
            dormImage: null,
            username: "",
            password: "",
            firstName: "",
            lastName: "",
          }}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="40px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                {/* Yurt Adı */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Yurt Adı"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dormName}
                  name="dormName"
                  error={!!touched.dormName && !!errors.dormName}
                  helperText={touched.dormName && errors.dormName}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Telefon Numarası */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="tel"
                  label="Telefon Numarası"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dormContact}
                  name="dormContact"
                  error={!!touched.dormContact && !!errors.dormContact}
                  helperText={touched.dormContact && errors.dormContact}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Yurt Görseli */}
                <Input
                  fullWidth
                  type="file"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    setFieldValue("dormImage", event.currentTarget.files[0]);
                  }}
                  error={!!touched.dormImage && !!errors.dormImage}
                  name="dormImage"
                  sx={{ gridColumn: "span 4" }} // Tam satırı kaplayacak şekilde genişletildi
                />
                {/* Kullanıcı Adı */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Kullanıcı Adı"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Şifre */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Şifre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Ad */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Ad"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Soyad */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Soyad"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              {/* Form Submit Button */}
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Bilgileri Kaydet
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
  };
  export default AddDormAdmin;


