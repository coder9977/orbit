import { useState, useEffect, useContext, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { type UserInfo } from "../../components/ContextWrapper";
import { LoginResponseStatus } from "./const"
import { storage, ValueTypes } from "../../utils/storage.utils";
import { GlobalContext } from "../../components/ContextWrapper";
import { BACKEND_ENDPOINT } from "../../config/config";

export const LoginPage = () => {
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
    const { loginInfo, setLoginInfo } = useContext<{
    loginInfo: UserInfo;
    setLoginInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  }>(GlobalContext);
    const userStore = storage("userInfo", ValueTypes.JSON);
    const [userInfo, setUserInfo] = useState<UserInfo>(loginInfo);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUserInfo = userStore.get();
        if (storedUserInfo) {
            setIsRememberMeChecked(true);
            navigate("/")
        }
    }, [loginInfo]);

    const loginHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem("userInfo");
        if (loginInfo?.name && isRememberMeChecked) {
            localStorage.setItem("userInfo", JSON.stringify(loginInfo));
        }
        const res = await fetch(`${BACKEND_ENDPOINT}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        const { status, data } = await res.json();
        if (status === LoginResponseStatus.REJECTED) {
            setLoginInfo(null);
            setIsRememberMeChecked(false);
            userStore.clear();
            alert("any of the username or password is fucking wrong!");
            return;
        }
        userStore.set(JSON.stringify(data));
        setLoginInfo(data);
        
    };

    const onRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRememberMeChecked(event.target.checked);
    };

    const onLoginInfoChange = (field: keyof UserInfo, value: string) => {
        setUserInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return <div className="login-container">
        <div className="login-box">
            <h1>Login</h1>
            <div>
                <div className="input-group">
                    <input type="text" placeholder="Username" value={userInfo?.name ?? ""} onChange={(e) => onLoginInfoChange("name", e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Password" value={userInfo?.email ?? ""} onChange={(e) => onLoginInfoChange("email", e.target.value)} />
                </div>
                <div className="input-group remember">
                    <div className="remember-me">
                        <input type="checkbox" id="rememberMe" checked={isRememberMeChecked} onChange={onRememberMeChange} />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <div className="forget-password">
                        <a href="" onClick={(e) => {
                            e.preventDefault();
                            console.log("Forgot password clicked");
                        }}>
                            Forgot Password?
                        </a>
                    </div>
                </div>
                <button type="button" onClick={loginHandler}>Login</button>
            </div>
        </div>
    </div>
}
