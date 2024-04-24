import React, { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  colors,
  Fab,
} from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/header/Header";
import { blue, grey, indigo, lightBlue, red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
////
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const userSchema = yup.object().shape({
  roomNumber: yup.string().required("required"),
  roomCapacity: yup.string().required("required"),
  roomType: yup.string().required("required"),
  //   studentCapacity:yup.string().required("required"),
  roomStatu: yup.string().required("required"),
  // studentAdd: yup.string().required("required"),
});
const initialValues = {
  roomNumber: "",
  roomCapacity: "",
  roomType: "",
  // studentCapacity: "",
  roomStatu: "",
  students: [{ student: "" }],
};
const Room = () => {
  //text field Adding
  const [textFieldsList, setTextFields] = useState([
    { id: 1, student: initialValues.student },
  ]); // State to hold text fields
  const handleTextFieldChange = (event, index, setFieldValue) => {
    const { name, value } = event.target;
    const list = [...textFieldsList];
    list[index][name] = value;
    setTextFields(list);

    // Use setFieldValue to update Formik state
    setFieldValue(`students[${index}].student`, value);
  };

  const handleTextFieldRemove = (index, setFieldValue, values) => {
    // Update local state
    const list = [...textFieldsList];
    list.splice(index, 1);
    setTextFields(list);

    // Update Formik state
    const students = [...values.students];
    students.splice(index, 1);
    setFieldValue("students", students);
  };
  const handleTextFieldAdd = (setFieldValue) => {
    setTextFields([...textFieldsList, { student: "" }]);
    // Update everytime
    setFieldValue(`students[${textFieldsList.length}].student`, "");
  };
  // Room Statu Colors
  const fullWomenRoomColor = red[900];
  const emptyWomenRoomColor = red[300];
  const fullManRoomColor = lightBlue[900];
  const emptyManRoomColor = blue[300];
  const emptyRoom = grey[400];

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box m="20px">
      <Header
        title="ODA İŞLEMLERİ"
        subtitle="Aşağıda Oda Ekleme ve Güncelleme işlemlerini yapabilirsiniz"
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
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="40px"
              gridTemplateColumns="repeat(3,minmax(0,1fr))"
              sx={{
                "& > div ": { gridColumn: isNonMobile ? undefined : "span 3" },
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
              {/* <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Öğrenci Kapasitesi"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.studentCapacity}
              name="studentCapacity"
              error={!!touched.studentCapacity && !!errors.studentCapacity}
              helperText={touched.studentCapacity && errors.studentCapacity}
              sx={{ gridColumn: "span 1" }}
              /> */}
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Oda Durumu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomStatu}
                name="roomStatu"
                error={!!touched.roomStatu && !!errors.roomStatu}
                helperText={touched.roomStatu && errors.roomStatu}
                sx={{ gridColumn: "span 2" }}
              /> */}
              <RadioGroup
                row
                fullWidth
                aria-label="roomStatu"
                name="roomStatu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomStatu}
                type="radio"
                variant="filled"
                error={!!touched.roomStatu && !!errors.roomStatu}
                helperText={touched.roomStatu && errors.roomStatu}
                sx={{ gridColumn: "span 4" }}
              >
                <FormControlLabel
                  value="Kadın Boş"
                  control={
                    <Radio
                      sx={{
                        color: emptyWomenRoomColor,
                        "& .MuiSvgIcon-root": {
                          fontSize: 45,
                        },
                        "&.Mui-checked": {
                          color: emptyWomenRoomColor,
                        },

                        //    '&:hover': {
                        //        backgroundColor: emptyRoomColor, // Hover olduğunda arkaplan rengi
                        //    },
                      }}
                    />
                  }
                  label="Kadın Boş"
                  //    sx={{ gridColumn: "span 3" }}
                />
                <FormControlLabel
                  value="Kadın Dolu"
                  control={
                    <Radio
                      sx={{
                        color: fullWomenRoomColor,
                        "& .MuiSvgIcon-root": {
                          fontSize: 45,
                        },
                        "&.Mui-checked": {
                          color: fullWomenRoomColor,
                        },
                      }}
                    />
                  }
                  label="Kadın Dolu"
                  //     sx={{ gridColumn: "span 3" }}
                />
                <FormControlLabel
                  value="Erkek Boş"
                  control={
                    <Radio
                      sx={{
                        color: emptyManRoomColor,
                        "& .MuiSvgIcon-root": {
                          fontSize: 45,
                        },
                        "&.Mui-checked": {
                          color: emptyManRoomColor,
                        },
                      }}
                    />
                  }
                  label="Erkek Boş"
                  //     sx={{ gridColumn: "span 3" }}
                />
                <FormControlLabel
                  value="ErkekDolu"
                  control={
                    <Radio
                      sx={{
                        color: fullManRoomColor,
                        "& .MuiSvgIcon-root": {
                          fontSize: 45,
                        },
                        "&.Mui-checked": {
                          color: fullManRoomColor,
                        },
                      }}
                    />
                  }
                  label="Erkek Dolu"
                  //     sx={{ gridColumn: "span 3" }}
                />
                <FormControlLabel
                  value="Boş"
                  control={
                    <Radio
                      sx={{
                        color: emptyRoom,
                        "& .MuiSvgIcon-root": {
                          fontSize: 45,
                        },
                        "&.Mui-checked": {
                          color: emptyRoom,
                        },
                      }}
                    />
                  }
                  label="Boş"
                  //     sx={{ gridColumn: "span 3" }}
                />
              </RadioGroup>
              <Box
                fullWidth
                // justifySelf="start"
                m="10px"
                display="grid"
                gap="50px"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                sx={{
                  "& > div ": {
                    gridColumn: isNonMobile ? undefined : "span 3",
                  },
                  gridColumn: "span 4",
                }}
              >
                {textFieldsList.map((textField, index) => (
                  <React.Fragment key={index}>
                    <TextField
                      key={index}
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Öğrenci Adı"
                      onBlur={handleBlur}
                      value={values.students[index].student} // Use Formik's values for the value prop
                      name={`students[${index}].student`} // Update name attribute
                      onChange={handleChange} // Use Formik's handleChange
                      error={!!touched.students && !!errors.students}
                      helperText={touched.students && errors.students}
                    />

                    {textFieldsList.length !== 1 && (
                      <Fab
                        // type="button"
                        adia-label="remove"
                        color="error"
                        onClick={() =>
                          handleTextFieldRemove(index, setFieldValue, values)
                        }
                        // className="remove-btn"
                      >
                        <RemoveIcon />
                      </Fab>
                    )}
                    {textFieldsList.length - 1 === index &&
                      textFieldsList.length < 6 && (
                        <Fab
                          onClick={() => handleTextFieldAdd(setFieldValue)}
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
                sx={{ height: 50, fontSize: 20, fontWeight: 600, width: "100" }}
              >
                Kaydet
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Room;
