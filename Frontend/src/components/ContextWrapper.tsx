import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GlobalContext } from "../context/GlobalContext";
import { ResponseStatus } from "../pages/LoginPage/const";

export const ContextWrapper = ({ children }: { children: JSX.Element }) => {
  const { loginInfo, clearLoginInfo, refreshAuth } = useAuth();

  return (
    <GlobalContext.Provider
      value={{
        loginInfo,
        clearLoginInfo,
        refreshAuth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
