import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../../../data/api"; // API fonksiyonlarını içeren dosya

const Userinfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userData = await fetchUserInfo(); // Kullanıcı bilgilerini al
        setUserInfo(userData); // Kullanıcı bilgilerini state'e kaydet
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo(); // Kullanıcı bilgilerini almak için fonksiyonu çağır
  }, []);

  return (
    <div className="user">
      {userInfo ? (
        <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Userinfo;
