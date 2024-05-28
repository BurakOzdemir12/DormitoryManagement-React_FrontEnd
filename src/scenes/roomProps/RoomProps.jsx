import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormGroup,
  FormLabel,
  Input,
  FormHelperText,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
  roomImage: yup
    .mixed()
    .test("fileCount", "En az bir fotoğraf girmek zorunludur", (value) => {
      return value && value.length > 0; // En az bir dosya girilmiş olmalı
    }),
});

const AddImageButton = ({ index, handleImageChange, file, initialImage }) => {
  const [previewUrl, setPreviewUrl] = useState(
    initialImage ? `http://localhost:8800/images/${initialImage}` : ""
  );
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Lütfen bir resim dosyası seçin.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setFileName(file.name);
    handleImageChange(event);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      setPreviewUrl(
        initialImage ? `http://localhost:8800/images/${initialImage}` : ""
      );
      setFileName(initialImage ? initialImage.split("/").pop() : "");
    }
  }, [file, initialImage]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button variant="outlined" component="label" sx={{ mt: 2, p: 2 }}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`Önizleme ${fileName}`}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <AddIcon color="secondary" sx={{ fontSize: 30 }} />
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Button>
      <Typography variant="body1">
        {fileName ? fileName : `Fotoğraf ${index + 1}`}
      </Typography>
    </Box>
  );
};

const RoomImageInput = ({
  setFieldValue,
  errors,
  touched,
  initialImages = [],
}) => {
  const handleImageChange = (index, event) => {
    const files = event.currentTarget.files;
    if (files.length > 0) {
      setFieldValue(`roomImage_${index}`, files);
    }
  };
  return (
    <FormGroup sx={{ gridColumn: "span 2", display: "flex", gap: 5 }}>
      <FormLabel htmlFor="roomImage">Oda Fotoğrafları Seç</FormLabel>
      <Box sx={{ display: "flex", gap: 15 }}>
        {[...Array(5)].map((_, index) => (
          <AddImageButton
            key={index}
            index={index}
            handleImageChange={(event) => handleImageChange(index, event)}
            initialImage={initialImages[index] || ""}
          />
        ))}
      </Box>
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
  const [dormId, setDormId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        if (dormId) {
          const features = await fetchRoomFeatures(dormId);
          setRoomFeatures(features);
        }
      } catch (error) {
        console.error("Oda özellikleri getirilirken hata oluştu:", error);
      }
    };
    fetchFeatures();
  }, [dormId, editFeature]);

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form verileri:", values);
    const isEditMode = editFeature !== null;
  
    const imageKeys = Object.keys(values).filter((key) =>
      key.includes("roomImage")
    );
    const roomImages = imageKeys.reduce((acc, key) => {
      const files = values[key];
      if (files && files.length > 0) {
        acc.push(...files);
      }
      return acc;
    }, []);
  
    if (roomImages.length === 0) {
      alert("Lütfen en az bir oda fotoğrafı ekleyin.");
      return;
    }
  
    const { dormId, roomPrice, roomType } = values;
    const id = editFeature ? editFeature.id : undefined;
    const dataToSubmit = {
      id,
      dormId,
      roomPrice,
      roomType,
      roomImage: roomImages,
    };
  
    try {
      await saveRoomFeature(dataToSubmit, isEditMode, dormId);
      resetForm();
      setEditFeature(null);
      const features = await fetchRoomFeatures(dormId);
      setRoomFeatures(features);
      // Arka planda HTTP isteği gerçekleştirme
      await performBackgroundTask();
    } catch (error) {
      console.error("Form gönderilirken bir hata oluştu:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const performBackgroundTask = async () => {
    try {
      // Arka planda HTTP isteği gerçekleştir
      await fetch("example.com/perform-task", {
        method: "POST",
        // İsteği gerektiği gibi yapılandır
      });
      // İşlem tamamlandığında sayfanın yenilenmesini sağla
      window.location.reload();
    } catch (error) {
      console.error("Arka planda işlem gerçekleştirilirken hata oluştu:", error);
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

  const totalPages = Math.ceil(roomFeatures.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatedFeatures = roomFeatures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box m="20px">
      <Header
        title="ODA ÖZELLİKLERİ"
        subtitle="Odaların fiyatlarını, ayrıntılı bilgilerini ve görsellerini buradan kontrol edebilirsiniz"
      />
      <Formik
        initialValues={{
          roomPrice: editFeature ? editFeature.roomPrice : "",
          roomType: editFeature ? editFeature.roomType : "",
          roomImage: Array(5).fill(null),
          dormId: dormId,
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
                label="Oda Türü Gir"
                sx={{ gridColumn: "span 2", gridRow: "span 3" }}
              />
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
                label="Oda Fiyatı Gir"
                sx={{ gridColumn: "span 2", gridRow: "span 3" }}
              />
              <RoomImageInput
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                initialImages={editFeature ? editFeature.roomImage : []}
                sx={{ gridColumn: "span 3" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {editFeature ? "Bilgileri Güncelle" : "Yeni Oda Ekle"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box display="flex" flexWrap="wrap" marginTop={10}>
        {paginatedFeatures.map((feature) => (
          <Card
            key={feature.id}
            sx={{
              mb: 2,
              backgroundColor: "transparent",
              width: "30%",
              marginRight: "2%",
            }}
          >
            <CardContent>
              <Typography variant="h3">{feature.roomType}</Typography>
              <Typography color="textSecondary">{feature.roomPrice}</Typography>
              <Box sx={{ display: "flex", gap: 3 }}>
                {feature.roomImage.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8800/images/${img}`}
                    alt={`Oda resmi ${index + 1}`}
                    style={{ width: 50, height: 50 }}
                  />
                ))}
              </Box>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                color="secondary"
                onClick={() => handleEdit(feature)}
              >
                Düzenle
              </Button>
              <Button
                color="secondary"
                onClick={() => handleDelete(feature.id)}
              >
                Sil
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="body2">{`${currentPage} / ${totalPages}`}</Typography>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RoomProps;
