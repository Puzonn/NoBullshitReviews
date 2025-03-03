import { useEffect, useState } from "react";
import AuthContext from "src/contexes/AuthContext";
import { User } from "src/types/Types";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(undefined);

  useEffect(() => {
    try {
      fetch("https://localhost:7106/auth/@me", {
        credentials: "include",
      }).then((response) => {
        if (response.status !== 200) {
          return;
        }
        response.json().then((e) => {
          setUser(e);
        });
      });
    } catch (e) {}
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
