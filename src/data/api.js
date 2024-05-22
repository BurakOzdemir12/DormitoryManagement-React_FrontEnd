import axiosInstance from './axiosInstance';

// Yurt bilgilerini al
export const fetchDormFeature = async (dormId) => {
  const response = await axiosInstance.get(`/dormfeature/${dormId}`);
  return response.data;
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