import { createContext, JSX } from "react";
import { useLoginInfo, UserInfo } from "../hooks/useLoginInfo";

export let GlobalContext: any = null;
export const ContextWrapper = ({ children }: { children:  JSX.Element }) => {
    const { loginInfo, setLoginInfo } = useLoginInfo();
    GlobalContext = createContext<{
        loginInfo: UserInfo;
        setLoginInfo: (userInfo: UserInfo | null) => void;
      }>({
        loginInfo: loginInfo as UserInfo,
        setLoginInfo,
      });
    return <GlobalContext.Provider value={{
        loginInfo,
        setLoginInfo
    }}>{children}</GlobalContext.Provider>
}