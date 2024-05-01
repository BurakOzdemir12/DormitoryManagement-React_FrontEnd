import React from "react";
import {
  Box,
  IconButton,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/header/Header";

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
  passportNo: yup.string().required("required"),
  // adress: yup.string().required("required"),
  registerStatu: yup.string().required("required"),
  faculty: yup.string().required("required"),
  gender: yup.string().required("required"),
  // email:yup.string().email("Geçersiz mail adresi").required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  studentNo: "",
  phoneNumb: "",
  passportNo: "",
  // adress: "",
  registerStatu: "",
  faculty: "",
  gender: "",
};
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    
    console.log(values);
  };
  return (
    <Box m="20px">
      <Header
        title="ÖĞRENCİ EKLE"
        subtitle="Öğrenci Ekleme, Güncelleme ve oda atama işlemi aşağıda yapılabilmektedir"
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid "
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
                label="Telefon No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumb}
                name="phoneNumb"
                error={!!touched.phoneNumb && !!errors.phoneNumb}
                helperText={touched.phoneNumb && errors.phoneNumb}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Pasaport No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passportNo}
                name="passportNo"
                error={!!touched.passportNo && !!errors.passportNo}
                helperText={touched.passportNo && errors.passportNo}
                sx={{ gridColumn: "span 1" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adres"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adress}
                name="adress"
                error={!!touched.adress && !!errors.adress}
                helperText={touched.adress && errors.adress}
                sx={{ gridColumn: "span 3" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="bool"
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
                label={"Fakülte"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.faculty}
                name="faculty"
                error={!!touched.faculty && !!errors.faculty}
                helperText={touched.faculty && errors.faculty}
                sx={{ gridColumn: "span 1", fontSize: "12rem" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cinsiyet"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 1" }}
              /> */}
              <RadioGroup
                row
                fullWidth
                aria-label="gender"
                name="gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                type="radio"
                variant="filled"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                // sx={{ gridColumn: "span 2" }}
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
              <Button type="submit" color="secondary" variant="contained"
              sx={{height:50,fontSize:20,fontWeight:600,width:"100"}}>
                Kaydet
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
