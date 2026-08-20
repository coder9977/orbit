import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Flex } from "antd";
import { ContextWrapper } from "./components/ContextWrapper.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard").then(({ Dashboard }) => ({ default: Dashboard })));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage").then(({ LoginPage }) => ({ default: LoginPage })));
const HomePage = lazy(() => import("./pages/HomePage/HomePage").then(({ HomePage }) => ({ default: HomePage })));
const NotFound = lazy(() => import("./pages/NotFound/NotFound").then(({ NotFound }) => ({ default: NotFound })));
const Welcome = lazy(() => import("./pages/Welcome/Welcome").then(({ Welcome }) => ({ default: Welcome })));

export default function App() {
  return (
    <ContextWrapper>
      <Flex vertical flex="1" className="full-h">
        <Suspense fallback={null}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="/countries" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Flex>
    </ContextWrapper>
  );
}
