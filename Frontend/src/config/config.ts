export const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_URI ? `${import.meta.env.VITE_BACKEND_URI}:443` : "https://192.168.5.199:443";
export const BACKEND_GRAPHQL_ENDPOINT = `${BACKEND_ENDPOINT}/graphql`;
export const IS_DEV = true;