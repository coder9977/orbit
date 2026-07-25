import { useEffect, useState } from "react";
import moment from "moment";
import { storage, ValueTypes } from "../utils/storage";

export type UserInfo = {
    name?: string;
    email?: string;
    lastLoginAt?: string,
    permissions?: string[],
}
export const useLoginInfo = () => {
    const expiryPeriodInMinutes = 1;
    const userStore = storage("userInfo", ValueTypes.JSON);
    const [loginInfo, setLoginInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const userInfo = userStore.get() as UserInfo;
        const timeElapsedSinceLastLogin = moment(Date.now()).diff(moment(new Date(userInfo?.lastLoginAt as string)), "m");
        console.log({ timeElapsedSinceLastLogin})
        if (timeElapsedSinceLastLogin <= expiryPeriodInMinutes) {
            return setLoginInfo(userInfo);
        }
        userStore.clear();
    }, []);

    return {
        loginInfo,
        setLoginInfo: (userInfo: UserInfo | null) => {
            userStore.set(JSON.stringify(userInfo ?? {}))
            setLoginInfo(userInfo);
        }
    }
}
