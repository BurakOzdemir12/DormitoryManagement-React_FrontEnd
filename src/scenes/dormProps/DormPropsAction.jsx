import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { fetchDormFeature, fetchUserInfo, saveDormFeature } from '../../data/api';

const DormPropsAction = ({ handleFormSubmit }) => {
  const { setFieldValue, setSubmitting, values, resetForm } = useFormikContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [dormId, setDormId] = useState(null);

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const userInfo = await fetchUserInfo();
        const userDormId = userInfo.dormId;

        if (userDormId) {
          const dormData = await fetchDormFeature(userDormId);
          Object.keys(dormData).forEach((key) => setFieldValue(key, dormData[key]));
          setIsEditMode(true);
          setDormId(userDormId);
        } else {
          setIsEditMode(false);
        }
      } catch (error) {
        console.error('Form başlatılırken bir hata oluştu:', error);
      }
    };

    initializeForm();
  }, [setFieldValue]);

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="submit" style={{ display: 'none' }} />
    </form>
  );
};

export default DormPropsAction;
