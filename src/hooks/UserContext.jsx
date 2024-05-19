// UserContext.js

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(false); // Separate state for logout

  return (
    <UserContext.Provider value={{ user, setUser, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
