import { createContext, useContext } from "react";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { useLoginInfo, UserInfo } from "./hooks/useLoginInfo.ts";

export let GlobalContext: any = null;
export default function App() {
  const { loginInfo, setLoginInfo } = useLoginInfo();
  GlobalContext = createContext<{
    loginInfo: UserInfo;
    setLoginInfo: (userInfo: UserInfo | null) => void;
  }>({
    loginInfo: loginInfo as UserInfo,
    setLoginInfo,
  });
  return (
    <GlobalContext value={{ loginInfo: loginInfo as UserInfo, setLoginInfo}}>
      <div className="app-shell">
        {loginInfo?.name ? <HomePage /> : <LoginPage />}
      </div>
    </GlobalContext>
  );
}
