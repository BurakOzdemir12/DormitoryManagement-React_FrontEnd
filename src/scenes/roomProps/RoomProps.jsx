import React, { useState, useEffect } from "react";
import {
  Box,
  
  TextField,
  FormGroup,
  FormLabel,
  Input,
  FormHelperText,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../Components/header/Header";
import RoomPropsAction from "./RoomPropsAction";
import {
  saveRoomFeature,
  fetchRoomFeatures,
  deleteRoomFeature,
} from "../../data/api";
import { tokens } from "../../theme";

// Validation schema
const userSchema = yup.object().shape({
  roomType: yup.string().required("Oda Tipi Girmek zorunludur"),
  roomPrice: yup.string().required("Fiyat Girmek zorunludur"),
  roomImage: yup.mixed().required("Oda Fotoğrafı Girmek Zorunludur"),
});

const RoomImageInput = ({ setFieldValue, errors, touched, handleBlur }) => {
  const handleImageChange = (event) => {
    setFieldValue("roomImage", event.currentTarget.files[0]);
  };

  return (
    <FormGroup sx={{ gridColumn: "span 2" }}>
      <FormLabel htmlFor="roomImage">Oda Fotoğrafları Seç</FormLabel>
      <Input
        fullWidth
        variant="filled"
        onBlur={handleBlur}
        onChange={handleImageChange}
        name="roomImage"
        error={!!touched.roomImage && !!errors.roomImage}
        id="roomImage"
        type="file"
        placeholder="Yurt Fotoğrafı"
      />
      {!!touched.roomImage && !!errors.roomImage && (
        <FormHelperText error>{errors.roomImage}</FormHelperText>
      )}
    </FormGroup>
  );
};

const RoomProps = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:720px)");
  const [roomFeatures, setRoomFeatures] = useState([]);
  const [editFeature, setEditFeature] = useState(null);
  const [dormId, setDormId] = useState(null); // dormId state olarak tanımlandı

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        if (dormId) {
          const features = await fetchRoomFeatures(dormId);
          setRoomFeatures(features);
        }
      } catch (error) {
        console.error("Error fetching room features:", error);
      }
    };
    fetchFeatures();
  }, [dormId, editFeature]);

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    const isEditMode = editFeature !== null;
    const dataToSubmit = { ...values, dormId }; // dormId'yi veriye ekle
    try {
      await saveRoomFeature(dataToSubmit, isEditMode, dormId); // dormId'yi kullan
      resetForm();
      setEditFeature(null);
      const features = await fetchRoomFeatures(dormId);
      setRoomFeatures(features);
    } catch (error) {
      console.error("Form gönderilirken bir hata oluştu:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (feature) => {
    setEditFeature(feature);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoomFeature(id);
      const features = await fetchRoomFeatures(dormId);
      setRoomFeatures(features);
    } catch (error) {
      console.error("Silme işlemi sırasında bir hata oluştu:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="ODA ÖZELLİKLERİ"
        subtitle="Odaların fiyatlarını ayrıntılı bilgilerini ve görsellerini buradan kontrol edebilirsiniz"
      />
      <Formik
        initialValues={{
          roomPrice: editFeature ? editFeature.roomPrice : "",
          roomType: editFeature ? editFeature.roomType : "",
          roomImage: null,
          dormId: dormId, // dormId'yi initialValues içine ekle
        }}
        validationSchema={userSchema}
        enableReinitialize
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
            <RoomPropsAction
              handleFormSubmit={handleSubmit}
              setDormId={setDormId}
            />
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
              <TextField
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomType}
                name="roomType"
                variant="filled"
                error={!!touched.roomType && !!errors.roomType}
                helperText={touched.roomType && errors.roomType}
                id="demo-helper-text-aligned"
                label="Oda Türü Gir "
                sx={{ gridColumn: "span 2", gridRow: "span 3" }}
              />{" "}
              <TextField
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomPrice}
                name="roomPrice"
                variant="filled"
                error={!!touched.roomPrice && !!errors.roomPrice}
                helperText={touched.roomPrice && errors.roomPrice}
                id="demo-helper-text-aligned-no-helper"
                label="Oda Fiyat Gir"
                sx={{ gridColumn: "span 2", gridRow: "span 3" }}
              />
              <RoomImageInput
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                sx={{ gridColumn: "span 3" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {editFeature ? "Bilgileri Güncelle" : "Bilgileri Kaydet"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box mt="40px">
        <Header
          title="KAYITLI ODA ÖZELLİKLERİ"
          subtitle="Kaydedilmiş oda özelliklerini burada görebilirsiniz"
        />
        {roomFeatures.map((feature) => (
          <Box
            key={feature.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
          >
            <Box>
              <p>Oda Türü: {feature.roomType}</p>
              <p>Oda Fiyatı: {feature.roomPrice}</p>
            </Box>
            <Box>
              <Button
                onClick={() => handleEdit(feature)}
                color="primary"
                variant="contained"
                style={{ marginRight: "10px" }}
              >
                Düzenle
              </Button>
              <Button
                onClick={() => handleDelete(feature.id)}
                // color="error"
                sx={{color:colors.grey[100],backgroundColor:colors.redAccent[600]}}
                variant="contained"
              >
                Sil
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RoomProps;
 