export const enum ResponseStatus {
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

export type API_RESPONSE = {
  status: ResponseStatus;
  data?: Record<string, any>;
  message?: string;
};
