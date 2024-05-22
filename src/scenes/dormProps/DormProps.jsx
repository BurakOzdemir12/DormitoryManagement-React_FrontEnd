import React from "react";
import {
  Box,
  Button,
  TextField,
  FormGroup,
  FormLabel,
  Input,
  FormHelperText,
  useMediaQuery,
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
        placeholder="Yurt Fotoğrafı"
      />
      {!!touched.dormImage && !!errors.dormImage && (
        <FormHelperText error>{errors.dormImage}</FormHelperText>
      )}
    </FormGroup>
  );
};

const DormProps = () => {
  const isNonMobile = useMediaQuery("(min-width:720px)");

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    const isEditMode = values.dormId !== null;
    try {
      await saveDormFeature(values, isEditMode, values.dormId);
      resetForm();
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
              <TextField
                fullWidth
                variant="filled"
                helperText="Lütfen Oda Türü Giriniz. Örnek; Tek Kişilik"
                id="demo-helper-text-aligned"
                label="Oda Türü Gir "
                sx={{ gridColumn: "span 2", gridRow: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                helperText=" "
                id="demo-helper-text-aligned-no-helper"
                label="Oda Fiyat Gir"
                sx={{ gridColumn: "span 2", gridRow: "span 2" }}
              />
              {/* {dorm.map((dormm)=>{

              })} */}
              <TextField
              disabled
                fullWidth
                variant="filled"
                helperText="Lütfen Oda Türü Giriniz. Örnek; Tek Kişilik"
                id="demo-helper-text-aligned"
                label="Oda Türü Gir "
                sx={{ gridColumn: "span 2", gridRow: "span 2" }}
              />

              <TextField
              disabled
                fullWidth
                variant="filled"
                helperText=" "
                id="demo-helper-text-aligned-no-helper"
                label="Oda Fiyat Gir"
                sx={{ gridColumn: "span 2", gridRow: "span 2" }}
              />
              {/* Yurt Fotoğrafı */}
              <DormImageInput
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                sx={{ gridColumn: "span 3" }}
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
    </Box>
  );
};

export default DormProps;

// import React from "react";
// import {
//   Box,
//   IconButton,
//   Button,
//   TextField,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormGroup,
//   Input,
//   FormLabel,
//   FormHelperText,
// } from "@mui/material";
// import { FastField, Field, FieldArray, Formik } from "formik";
// import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../Components/header/Header";

// const phoneRegExp =
//   /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// const validFileExtensions = {
//   image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
// };

// function isValidFileType(fileName, fileType) {
//   return (
//     fileName &&
//     validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
//   );
// }

// function getAllowedExt(type) {
//   return validFileExtensions[type].map((e) => `.${e}`).toString();
// }
// const MAX_FILE_SIZE = 102400;
// const userSchema = yup.object().shape({
//   dormName: yup.string().required("required"),
//   dormAdress: yup.string().required("required"),
//   dormContact: yup.string().required("required"),
//   dormRoomCapacity: yup.string().required("required"),
//   dormStudentCapacity: yup.string().required("required"),
//   dormImage: yup.mixed().required("required"),
//   // .test("is-valid-type", "Not a valid image type", (value) =>
//   //   isValidFileType(value && value.name.toLowerCase(), "image")
//   // )
//   // .test(
//   //   "is-valid-size",
//   //   "Max allowed size is 100KB",
//   //   (value) => value && value.size <= MAX_FILE_SIZE
//   // ),
// });
// const initialValues = {
//   dormName: "",
//   dormAdress: "",
//   dormContact: "",
//   dormRoomCapacity: "",
//   dormStudentCapacity: "",
//   dormImage: "",
// };
// const DormProps = () => {
//   const isNonMobile = useMediaQuery("(min-width:720px)");
//   const handleFormSubmit = (values) => {
//     console.log(values);
//   };
//   return (
//     <Box m="20px">
//       <Header
//         title="YURT BİLGİLERİ"
//         subtitle="Yurt Özelliklerini Buradan Girebilir ve Güncelleyebilirsiniz"
//       />
//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={userSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid "
//               gap="40px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div ": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Yurt Adı"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.dormName}
//                 name="dormName"
//                 error={!!touched.dormName && !!errors.dormName}
//                 helperText={touched.dormName && errors.dormName}
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Adres"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.dormAdress}
//                 name="dormAdress"
//                 error={!!touched.dormAdress && !!errors.dormAdress}
//                 helperText={touched.dormAdress && errors.dormAdress}
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="number"
//                 label="Telefon Numarası"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.dormContact}
//                 name="dormContact"
//                 error={!!touched.dormContact && !!errors.dormContact}
//                 helperText={touched.dormContact && errors.dormContact}
//                 sx={{ gridColumn: "span 1" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="number"
//                 label="Oda Kapasitesi"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.dormRoomCapacity}
//                 name="dormRoomCapacity"
//                 error={!!touched.dormRoomCapacity && !!errors.dormRoomCapacity}
//                 helperText={touched.dormRoomCapacity && errors.dormRoomCapacity}
//                 sx={{ gridColumn: "span 1" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="number"
//                 label="Öğrenci Kapasitesi"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.dormStudentCapacity}
//                 name="dormStudentCapacity"
//                 error={
//                   !!touched.dormStudentCapacity && !!errors.dormStudentCapacity
//                 }
//                 helperText={
//                   touched.dormStudentCapacity && errors.dormStudentCapacity
//                 }
//                 sx={{ gridColumn: "span 1" }}
//               />

//               <FormGroup sx={{ gridColumn: "span 2" }}>
//                 {" "}
//                 <FormLabel>Yurt Fotoğrafı</FormLabel>{" "}
//                 <Input
//                   fullWidth
//                   variant="filled"
//                   label="Yurt Fotoğrafı"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.dormImage}
//                   name="dormImage"
//                   error={!!touched.dormImage && !!errors.dormImage}
//                   helperText={touched.dormImage && errors.dormImage}
//                   id="exampleFile"
//                   type="file"
//                   placeholder="Yurt Fotoğrafı"
//                 />
//               </FormGroup>
//               <Box
//                 sx={{
//                   gridColumn: "span 3",
//                   display: "flex",
//                   alignItems: "center",
//                   "& > :not(style)": { m: 1 },
//                 }}
//               >
//                 <TextField
//                 fullWidth
//                 variant="filled"
//                   helperText="Lütfen Oda Türü Giriniz. Örnek; Tek Kişilik"
//                   id="demo-helper-text-aligned"
//                   label="Oda Türü Gir "
//                 />
//                 <TextField
//                 fullWidth
//                 variant="filled"

//                   helperText=" "
//                   id="demo-helper-text-aligned-no-helper"
//                   label="Oda Fiyat Gir"
//                 />
//               </Box>
//               {/* <RadioGroup
//                 row
//                 fullWidth
//                 aria-label="gender"
//                 name="gender"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.gender}
//                 type="radio"
//                 variant="filled"
//                 error={!!touched.gender && !!errors.gender}
//                 helperText={touched.gender && errors.gender}
//                 // sx={{ gridColumn: "span 2" }}
//               >
//                 <FormControlLabel
//                   value="male"
//                   control={<Radio color="secondary" />}
//                   label="Erkek"
//                   sx={{ gridColumn: "span 2" }}
//                 />
//                 <FormControlLabel
//                   value="female"
//                   control={<Radio color="secondary" />}
//                   label="Kadın"
//                   sx={{ gridColumn: "span 2" }}
//                 />
//               </RadioGroup> */}
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button
//                 type="submit"
//                 color="secondary"
//                 variant="contained"
//                 sx={{ height: 50, fontSize: 20, fontWeight: 600, width: "100" }}
//               >
//                 Kaydet
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default DormProps;
