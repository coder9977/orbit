export enum ERR_CODES {
    INVALID_PARAMS = "invalid parameters",
    LOGIN_EXPIRED = "login expired",
    LOGIN_FAILED = "login failed",
    SERVER_ERROR = "server error",
    FORBIDDEN = "forbidden",
    NETWORK = "network failure",
}

export enum REQUEST_STATUS {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

export enum AUTH_MIDDLEWARE_ERROR_CODES {
    INVALID_CREDENTIALS = "Invalid credentials provided. Please provide valid credentials.",
}

export const AUTH_COOKIE_NAME = "token";
