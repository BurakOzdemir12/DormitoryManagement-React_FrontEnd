import React, { useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { fetchUserInfo } from '../../data/api';
import Cookies from "universal-cookie";
import {jwtDecode} from 'jwt-decode';

const RoomPropsAction = ({ setDormId }) => {
  const { setFieldValue } = useFormikContext();
  const cookies = useMemo(() => new Cookies(), []); // useMemo ile cookies oluşturuldu

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const token = cookies.get("jwt_auth");
        if (token) {
          const decoded = jwtDecode(token);
          const userDormId = decoded.dormId; // JWT'den dormId alınması
          
          if (userDormId) {
            setDormId(userDormId);
            setFieldValue("dormId", userDormId);
          }
        }
      } catch (error) {
        console.error('Form başlatılırken bir hata oluştu:', error);
      }
    };

    initializeForm();
  }, [setDormId, setFieldValue, cookies]);

  return null;
};

export default RoomPropsAction;
