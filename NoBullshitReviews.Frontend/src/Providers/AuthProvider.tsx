import AuthContext from "src/Contexts/AuthContext";
import * as React from "react";

const AuthProvider = ({ children }) => {
  React.useEffect(() => {
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;