import { createContext } from "react";
import { UserInfo } from "../components/ContextWrapper";

export type GlobalContextType = {
    loginInfo: UserInfo | null;
    setLoginInfo: (userInfo: UserInfo | null) => void;
}
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);