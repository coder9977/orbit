import { JSX, useEffect, useState } from "react";
import { tokenStore } from "../utils/storage.utils";
import { useNavigate } from "react-router-dom";
import { httpRequest } from "../utils/request.utils";
import { BACKEND_ENDPOINT } from "../config/config";
import { REQUEST_STATUS } from "../constants/consts";
import { GlobalContext } from "../context/GlobalContext";
import { ResponseStatus } from "../pages/LoginPage/const";

export type UserInfo = {
  name?: string;
  email?: string;
  lastLoginAt?: string;
  permissions?: string[];
  password?: string;
};

export const ContextWrapper = ({ children }: { children: JSX.Element }) => {
  const token = tokenStore.get() ?? "";
  const [loginInfo, setLoginInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    httpRequest<{ status: string; data: UserInfo }>(
      `${BACKEND_ENDPOINT}/auth`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        } as HeadersInit,
        signal: controller.signal,
      },
    )
      .then((res) => {
        if (res?.status !== (REQUEST_STATUS.OK as unknown as ResponseStatus)) {
          setLoginInfo(null);
          tokenStore.clear();
          navigate("/login");
          return;
        }
        setLoginInfo((res.data as UserInfo) ?? null);
      })
      .catch((err) => {
        console.log("Error fetching user info: ", err);
        tokenStore.clear();
        setLoginInfo(null);
        navigate("/login");
      });
    return () => controller.abort();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loginInfo,
        setLoginInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
