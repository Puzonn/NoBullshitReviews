import AuthContext from "src/contexts/AuthContext";
import * as React from "react";

const AuthProvider = ({ children }) => {
  React.useEffect(() => {
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;