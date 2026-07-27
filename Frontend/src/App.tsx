import { JSX, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { useLoginInfo, UserInfo } from "./hooks/useLoginInfo.ts";
import { ContextWrapper } from "./components/ContextWrapper.tsx";


export default function App() {
  const navigator = useNavigate();
  const { loginInfo, setLoginInfo } = useLoginInfo();

  useEffect(() => {
    if (!loginInfo?.name) {
      navigator("/login");
    }
  }, [loginInfo])
  return (
    <ContextWrapper>
        <div className="app-shell">
          <Routes>
            <Route index element={ <HomePage /> } />
            <Route path="/login" element={ <LoginPage /> } />
          </Routes>
        </div>
    </ContextWrapper>
  );
}
