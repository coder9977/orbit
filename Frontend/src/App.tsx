import { Routes, Route } from "react-router-dom";
import { Flex } from "antd";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage.tsx";
import { ContextWrapper } from "./components/ContextWrapper.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { NotFound } from "./pages/NotFound/NotFound";

export default function App() {
  return (
    <ContextWrapper>
      <Flex vertical flex="1" className="full-h">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="/countries" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Flex>
    </ContextWrapper>
  );
}
