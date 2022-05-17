import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { player } = useContext(AuthContext);

  return player.logged ? children : <Navigate to="/login" />;
};
