import axiosInstance from './axiosInstance';

// Yurt bilgilerini al
export const fetchDormFeature = async (dormId) => {
  const response = await axiosInstance.get(`/dormfeature/${dormId}`);
  return response.data;
};

// Oda Özellikleri bilgilerini al
export const fetchRoomFeatures = async () => {
  try {
    const userInfo = await fetchUserInfo(); 
    const dormId = userInfo.dormId; 
    const response = await axiosInstance.get(`/roomprops/${dormId}`);
    return response.data;
  } catch (error) {
    console.error("Oda bilgileri gelmedi", error);
    throw error;
  }
};

// Kullanıcı bilgilerini al
export const fetchUserInfo = async () => {
  const response = await axiosInstance.get('/api/me');
  return response.data;
};

// Yurt bilgilerini kaydet
export const saveDormFeature = async (dormData, isEditMode, dormId) => {
  const formData = new FormData();
  Object.keys(dormData).forEach(key => {
    formData.append(key, dormData[key]);
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  if (isEditMode) {
    await axiosInstance.put(`/dormfeature/${dormId}`, formData, config);
  } else {
    await axiosInstance.post('/dormfeature', formData, config);
  }
};

// Oda Özellikleri Kaydet
export const saveRoomFeature = async (featureData, isEditMode) => {
  const userInfo = await fetchUserInfo(); 
  const dormId = userInfo.dormId; 
  featureData.dormId = dormId;  // dormId'yi featureData'ya ekle

  const formData = new FormData();
  formData.append("roomType", featureData.roomType);
  formData.append("roomPrice", featureData.roomPrice);
  formData.append("dormId", dormId);

  if (Array.isArray(featureData.roomImage)) {
    featureData.roomImage.forEach((image, index) => {
      formData.append(`roomImage`, image);
    });
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  if (isEditMode) {
    await axiosInstance.put(`/roomprops/${featureData.id}`, formData, config);
  } else {
    await axiosInstance.post(`/roomprops`, formData, config);
  }
};

// Oda Özellikleri Sil
export const deleteRoomFeature = async (id) => {
  await axiosInstance.delete(`/roomprops/${id}`);
};