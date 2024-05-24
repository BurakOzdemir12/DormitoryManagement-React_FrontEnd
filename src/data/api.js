import axiosInstance from './axiosInstance';

// Yurt bilgilerini al
export const fetchDormFeature = async (dormId) => {
  const response = await axiosInstance.get(`/dormfeature/${dormId}`);
  return response.data;
};

// Oda Özellikleri bilgilerini al
export const fetchRoomFeatures = async (dormId) => {
  try {
    const response = await axiosInstance.get(`/roomprops/${dormId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room features:", error);
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
export const saveRoomFeature = async (roomData, isEditMode, dormId) => {
  const rformData = new FormData();
  Object.keys(roomData).forEach(key => {
    rformData.append(key, roomData[key]);
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  if (isEditMode) {
    await axiosInstance.put(`/roomprops/${dormId}`, rformData, config);
  } else {
    await axiosInstance.post('/roomprops', rformData, config);
  }
};

// Oda Özellikleri Sil
export const deleteRoomFeature = async (id) => {
  await axiosInstance.delete(`/roomprops/${id}`);
};