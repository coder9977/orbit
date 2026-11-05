import { useState, useEffect, useContext, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { type UserInfo } from "../../components/ContextWrapper";
import { API_RESPONSE, ResponseStatus } from "./const";
import {type GlobalContextType, GlobalContext} from "../../context/GlobalContext";
import { BACKEND_ENDPOINT } from "../../config/config";
import { httpRequest } from "../../utils/request.utils";

export const LoginPage = () => {
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
    const { loginInfo, setLoginInfo } = useContext<GlobalContextType>(GlobalContext as React.Context<GlobalContextType>);
    const [userInfo, setUserInfo] = useState<UserInfo>(loginInfo as UserInfo);
    const navigate = useNavigate();
    useEffect(() => {
        if (loginInfo) {
            setIsRememberMeChecked(true);
            navigate("/")
        }
    }, [loginInfo]);

    const loginHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        const res = await httpRequest<API_RESPONSE>(`${BACKEND_ENDPOINT}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        }).catch((err)=> {
            console.log({err});
            return;
        });
        const {status, data } = res as API_RESPONSE;
        if (status === ResponseStatus.FORBIDDEN) {
            setIsRememberMeChecked(false);
            alert("any of the username or password is fucking wrong!");
            return;
        }
        if(status === ResponseStatus.OK) {
            setLoginInfo(data as UserInfo);
        }
        
        
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
                    <input type="password" placeholder="Password" value={userInfo?.password ?? ""} onChange={(e) => onLoginInfoChange("password", e.target.value)} />
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
