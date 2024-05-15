import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Fab,
  CircularProgress,
  Alert,
} from "@mui/material";
import { blue, grey, indigo, lightBlue, red } from "@mui/material/colors";
import { Field, FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/header/Header";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

const userSchema = yup.object().shape({
  roomNumber: yup.string().required("required"),
  roomCapacity: yup.string().required("required"),
  roomType: yup.string().required("required"),
  roomStatu: yup.string().required("required"),
});

const RoomUpdate = () => {
  const [initialValues, setRoom] = useState({
    roomNumber: "",
    roomCapacity: "",
    roomType: "",
    roomStatu: "",
    students: [{ student: "" }],
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setshowErrorAlert] = useState(false);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Filter out empty student entries
      const filteredStudents = values.students.filter(
        (student) => student.student.trim() !== ""
      );
      const studentNames = filteredStudents.map((student) => student.student);
      const payload = {
        ...values,
        students: JSON.stringify(studentNames),
      };

      await axios.post("http://localhost:8800/rooms", payload);
      resetForm();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      setSubmitting(false);
    } catch (error) {
      setshowErrorAlert(true);
      setTimeout(() => {
        setshowErrorAlert(false);
      }, 2000);
      console.log(error);
      setSubmitting(false);
    }
  };

  const handleTextFieldRemove = (index, setFieldValue, values) => {
    const list = [...values.students];
    list.splice(index, 1);
    setFieldValue("students", list);
  };

  const handleTextFieldAdd = (setFieldValue, values) => {
    const newList = [...values.students, { student: "" }];
    setFieldValue("students", newList);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <Box m="20px">
      <Header
        title="ODA EKLE"
        subtitle="Oda Ekleme, Güncelleme ve Öğrenciyi Odaya atama gibi işlemler aşağıda yapılabilmektedir"
      />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          setFieldValue,
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
                type="number"
                label="Oda Numarası"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomNumber}
                name="roomNumber"
                error={!!touched.roomNumber && !!errors.roomNumber}
                helperText={touched.roomNumber && errors.roomNumber}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Kapasite"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomCapacity}
                name="roomCapacity"
                error={!!touched.roomCapacity && !!errors.roomCapacity}
                helperText={touched.roomCapacity && errors.roomCapacity}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Oda Tipi"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomType}
                name="roomType"
                error={!!touched.roomType && !!errors.roomType}
                helperText={touched.roomType && errors.roomType}
                sx={{ gridColumn: "span 1" }}
              />
              <RadioGroup
                row
                fullWidth
                aria-label="roomStatu"
                name="roomStatu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomStatu}
                sx={{
                  gridColumn: "span 4",
                  ".MuiFormControlLabel-root": {
                    "& .MuiFormControlLabel-label": { fontSize: 20 },
                  },
                  ".MuiSvgIcon-root": {
                    fontSize: 40,
                  },
                }}
              >
                <FormControlLabel
                  value="Kadın Boş"
                  control={
                    <Radio
                      sx={{
                        color: red[300],
                        "&.Mui-checked": { color: red[300] },
                      }}
                    />
                  }
                  label="Kadın Boş"
                />
                <FormControlLabel
                  value="Kadın Dolu"
                  control={
                    <Radio
                      sx={{
                        color: red[900],
                        "&.Mui-checked": { color: red[900] },
                      }}
                    />
                  }
                  label="Kadın Dolu"
                />
                <FormControlLabel
                  value="Erkek Boş"
                  control={
                    <Radio
                      sx={{
                        color: blue[300],
                        "&.Mui-checked": { color: blue[300] },
                      }}
                    />
                  }
                  label="Erkek Boş"
                />
                <FormControlLabel
                  value="Erkek Dolu"
                  control={
                    <Radio
                      sx={{
                        color: lightBlue[900],
                        "&.Mui-checked": { color: lightBlue[900] },
                      }}
                    />
                  }
                  label="Erkek Dolu"
                />
                <FormControlLabel
                  value="Boş"
                  control={
                    <Radio
                      sx={{
                        color: grey[400],
                        "&.Mui-checked": { color: grey[400] },
                      }}
                    />
                  }
                  label="Boş"
                />
              </RadioGroup>
              <Box
                fullWidth
                m="10px"
                display="grid"
                gap="50px"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                  gridColumn: "span 4",
                }}
              >
                {values.students.map((student, index) => (
                  <React.Fragment key={index}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Öğrenci Adı"
                      onBlur={handleBlur}
                      value={student.student}
                      name={`students[${index}].student`}
                      onChange={handleChange}
                      error={!!touched.students && !!errors.students}
                      helperText={touched.students && errors.students}
                    />
                    {values.students.length !== 1 && (
                      <Fab
                        aria-label="remove"
                        color="error"
                        onClick={() =>
                          handleTextFieldRemove(index, setFieldValue, values)
                        }
                      >
                        <RemoveIcon />
                      </Fab>
                    )}
                    {values.students.length - 1 === index &&
                      values.students.length < 6 && (
                        <Fab
                          onClick={() =>
                            handleTextFieldAdd(setFieldValue, values)
                          }
                          color="success"
                          aria-label="add"
                        >
                          <AddIcon />
                        </Fab>
                      )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ height: 50, fontSize: 20, fontWeight: 600 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={40} /> : "Kaydet"}
              </Button>
            </Box>
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
          Oda Başarıyla Kaydedildi
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
          Oda Kaydedilemedi
        </Alert>
      )}
    </Box>
  );
};

export default RoomUpdate;
