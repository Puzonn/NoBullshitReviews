import { createContext } from "react";
import { User } from "src/types/Types";

const AuthContext = createContext<User | undefined>(undefined   );

export default AuthContext;
