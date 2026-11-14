 import { useEffect, useState } from "react";
import { httpRequest } from "../utils/request.utils";
import { BACKEND_ENDPOINT } from "../config/config";
import { REQUEST_STATUS } from "../constants/consts";
import { ResponseStatus } from "../pages/LoginPage/const";

export type UserInfo = {
  name?: string;
  email?: string;
  lastLoginAt?: string;
  permissions?: string[];
  password?: string;
};

const verifyAuth = async (): Promise<UserInfo | null> => {
    const controller = new AbortController();
    return await httpRequest<{ status: string; data: UserInfo }>(
      `${BACKEND_ENDPOINT}/auth`,
      { signal: controller.signal },
    )
      .then((res) => {
        if (res?.status !== (REQUEST_STATUS.OK as unknown as ResponseStatus)) {
          return null;
        }
        return res.data as UserInfo;
      })
      .catch((err) => {
        console.log("Error fetching user info: ", err);
        return null;
      });
}
 
 export const useAuth = () => {
  const [loginInfo, setLoginInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    verifyAuth().then((loginInfoResult) => {
      setLoginInfo(loginInfoResult);
    });
  }, []);

  const refreshAuth = async () => {
    const loginInfoResult = await verifyAuth();
    setLoginInfo(loginInfoResult);
  };

  const clearLoginInfo = () => {
    setLoginInfo(null);
  };
  return { loginInfo, clearLoginInfo, refreshAuth };
}