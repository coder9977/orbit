import { useState, useEffect, useContext, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { type UserInfo } from "../../hooks/useAuth";
import { API_RESPONSE, ResponseStatus } from "./const";
import {
  type GlobalContextType,
  GlobalContext,
} from "../../context/GlobalContext";
import { BACKEND_ENDPOINT } from "../../config/config";
import { httpRequest } from "../../utils/request.utils";
import { Layout, Input, Button, Typography } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";

export const LoginPage = () => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const { loginInfo, clearLoginInfo, refreshAuth } = useContext<GlobalContextType>(
    GlobalContext as React.Context<GlobalContextType>,
  );
  const [userInfo, setUserInfo] = useState<UserInfo>(loginInfo as UserInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginInfo) {
      setIsRememberMeChecked(true);
      navigate("/");
    }
  }, [loginInfo]);

  const loginHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log("BACKEND_ENDPOINT: ", BACKEND_ENDPOINT);
    const res = await httpRequest<API_RESPONSE>(`${BACKEND_ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).catch((err) => {
      console.log({ err });
      return;
    });
    const { status, data } = res as API_RESPONSE;
    if (status === ResponseStatus.FORBIDDEN) {
      setIsRememberMeChecked(false);
      alert("any of the username or password is fucking wrong!");
      return;
    }
    if (status === ResponseStatus.OK) {
      refreshAuth();
    }
  };

  const onRememberMeChange = (event: CheckboxChangeEvent) => {
    setIsRememberMeChecked(event.target.checked);
  };

  const onLoginInfoChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Layout className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <div>
          <div className="input-group">
            <Input
              type="text"
              placeholder="Username"
              value={userInfo?.name ?? ""}
              onChange={(e) => onLoginInfoChange("name", e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={userInfo?.password ?? ""}
              onChange={(e) => onLoginInfoChange("password", e.target.value)}
            />
          </div>
          <div className="input-group remember">
            <Checkbox
              id="rememberMe"
              checked={isRememberMeChecked}
              onChange={onRememberMeChange}
            >
              Remember Me
            </Checkbox>
            <Typography.Link
              href="javascript:void(0)"
              onClick={(e) => {
                e.preventDefault();
                console.log("Forgot password clicked");
              }}
            >
              Forgot Password?
            </Typography.Link>
          </div>
          <Button onClick={loginHandler}>Login</Button>
        </div>
      </div>
    </Layout>
  );
};
