import React, { useReducer, useEffect, useState } from "react";
import { AppRouter } from "./routers/AppRouter";
import { AuthContext } from "./auth/AuthContext";
import { authReducer } from "./auth/authReducer";
import { types } from "./types/types";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

export const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);
  const [question, setQuestion] = useState();
  const [level, setLevel] = useState(user.levelPlayer);
  const [score, setScore] = useState(user.scorePlayer);
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: "success",
    message: "",
  });

  const logout = () => {
    dispatch({
      type: types.logout,
    });
    if (alert.severity === "success") {
      setAlert({
        openAlert: true,
        severity: "success",
        message: "Sesíon cerrada con éxito!",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        player:user,
        dispatch,
        logout,
        alert,
        setAlert,
        question,
        setQuestion,
        level,
        setLevel,
        score,
        setScore
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  );
};
