import { createContext } from "react";
import { UserInfo } from "../hooks/useAuth";

export type GlobalContextType = {
    loginInfo: UserInfo | null;
    clearLoginInfo: () => void;
    refreshAuth: () => Promise<void>;
}
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);