import { createContext, useContext, useState } from "react";
const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const setUser = (value) => setCurrentUser(value);
  return (
    <AuthContext.Provider value={{ currentUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
