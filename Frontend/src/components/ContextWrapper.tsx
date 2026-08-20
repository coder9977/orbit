import { createContext, JSX, useEffect, useState } from "react";
import moment from "moment";
import { storage, ValueTypes } from "../utils/storage.utils";
import { useNavigate, useLocation } from "react-router-dom";

export type UserInfo = {
  name?: string;
  email?: string;
  lastLoginAt?: string;
  permissions?: string[];
};

export let GlobalContext: any = null;
export const ContextWrapper = ({ children }: { children: JSX.Element }) => {
  const expiryPeriodInMinutes = 1;
  const userStore = storage("userInfo", ValueTypes.JSON);
  const [loginInfo, setLoginInfo] = useState<UserInfo | null>(userStore.get());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userInfo = userStore.get() as UserInfo;
    const timeElapsedSinceLastLogin = moment(Date.now()).diff(
      moment(new Date(userInfo?.lastLoginAt as string)),
      "m",
    );
    console.log({timeElapsedSinceLastLogin})
    if (timeElapsedSinceLastLogin < expiryPeriodInMinutes) {
      return setLoginInfo(userInfo);
    }
    setLoginInfo(null);
    userStore.clear();
  }, []);

  // useEffect(() => {
  //   if (!loginInfo?.name) {
  //     navigate("/login");
  //   }
  // }, [loginInfo]);

  useEffect(() => {
   console.log({location})
  }, [location.state]);
  GlobalContext = createContext<{
    loginInfo: UserInfo;
    setLoginInfo: (userInfo: UserInfo | null) => void;
  }>({
    loginInfo: loginInfo as UserInfo,
    setLoginInfo,
  });
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
