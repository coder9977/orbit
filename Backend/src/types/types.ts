import { ERR_CODES, REQUEST_STATUS } from "../constants/constants.ts"

export type FAILURE_RESPONSE = {
    status: REQUEST_STATUS,
    code: ERR_CODES,
    msg?: string,
};

export type SUCCESS_RESPONSE = {
    status: REQUEST_STATUS,
    data: Record<string, any>
}

export type RESPONSE = SUCCESS_RESPONSE | FAILURE_RESPONSE;
