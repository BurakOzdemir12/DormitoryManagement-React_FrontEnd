import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormGroup,
  FormLabel,
  Input,
  FormHelperText,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../Components/header/Header";
import DormPropsAction from "./DormPropsAction";
import { saveDormFeature } from "../../data/api";

// Validation schema
const userSchema = yup.object().shape({
  dormName: yup.string().required("Yurt adı zorunludur"),
  dormAdress: yup.string().required("Adres zorunludur"),
  dormContact: yup.string().required("Telefon numarası zorunludur"),
  dormRoomCapacity: yup
    .number()
    .required("Oda kapasitesi zorunludur")
    .positive("Oda kapasitesi pozitif bir sayı olmalıdır"),
  dormStudentCapacity: yup
    .number()
    .required("Öğrenci kapasitesi zorunludur")
    .positive("Öğrenci kapasitesi pozitif bir sayı olmalıdır"),
  dormText: yup.string().required("Yurt Açıklaması Yazınız"),
  dormImage: yup.mixed().required("Yurt fotoğrafı zorunludur"),
});

const DormImageInput = ({ setFieldValue, errors, touched, handleBlur }) => {
  const handleImageChange = (event) => {
    setFieldValue("dormImage", event.currentTarget.files[0]);
  };

  return (
    <FormGroup sx={{ gridColumn: "span 2" }}>
      <FormLabel htmlFor="dormImage">Yurt Fotoğrafı</FormLabel>
      <Input
        fullWidth
        variant="filled"
        onBlur={handleBlur}
        onChange={handleImageChange}
        name="dormImage"
        error={!!touched.dormImage && !!errors.dormImage}
        id="dormImage"
        type="file"
      />
      {!!touched.dormImage && !!errors.dormImage && (
        <FormHelperText error>{errors.dormImage}</FormHelperText>
      )}
    </FormGroup>
  );
};

const DormProps = () => {
  const isNonMobile = useMediaQuery("(min-width:720px)");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    const isEditMode = values.dormId !== null;
    try {
      await saveDormFeature(values, isEditMode, values.dormId);
      setSuccessMessage(
        isEditMode ? "Başarıyla güncellendi" : "Başarıyla kaydedildi"
      );
      resetForm();
      window.location.reload();
    } catch (error) {
      console.error("Form gönderilirken bir hata oluştu:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="YURT BİLGİLERİ"
        subtitle="Yurt Özelliklerini Buradan Girebilir ve Güncelleyebilirsiniz"
      />
      <Formik
        initialValues={{
          dormName: "",
          dormAdress: "",
          dormContact: "",
          dormRoomCapacity: "",
          dormStudentCapacity: "",
          dormText: "",
          dormImage: "",
        }}
        validationSchema={userSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DormPropsAction handleFormSubmit={handleSubmit} />
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
              {/* Adres */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adres"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dormAdress}
                name="dormAdress"
                error={!!touched.dormAdress && !!errors.dormAdress}
                helperText={touched.dormAdress && errors.dormAdress}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Telefon Numarası */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefon Numarası"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dormContact}
                name="dormContact"
                error={!!touched.dormContact && !!errors.dormContact}
                helperText={touched.dormContact && errors.dormContact}
                sx={{ gridColumn: "span 1" }}
              />
              {/* Oda Kapasitesi */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Oda Kapasitesi"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dormRoomCapacity}
                name="dormRoomCapacity"
                error={!!touched.dormRoomCapacity && !!errors.dormRoomCapacity}
                helperText={touched.dormRoomCapacity && errors.dormRoomCapacity}
                sx={{ gridColumn: "span 1" }}
              />
              {/* Öğrenci Kapasitesi */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Öğrenci Kapasitesi"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dormStudentCapacity}
                name="dormStudentCapacity"
                error={
                  !!touched.dormStudentCapacity && !!errors.dormStudentCapacity
                }
                helperText={
                  touched.dormStudentCapacity && errors.dormStudentCapacity
                }
                sx={{ gridColumn: "span 1" }}
              />
              {/* Yurt Açıklama */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Yurt Açıklama"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dormText}
                name="dormText"
                error={!!touched.dormText && !!errors.dormText}
                helperText={touched.dormText && errors.dormText}
                sx={{ gridColumn: "span 4", gridRow: "span 2" }}
              />
              {/* Yurt Fotoğrafı */}
              <DormImageInput
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
              />
              {values.dormImage && (
                <img
                  src={`http://localhost:8800/images/${values.dormImage}`}
                  alt="Yurt Fotoğrafı"
                  style={{ maxWidth: "100%" }}
                />
              )}
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
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DormProps;

