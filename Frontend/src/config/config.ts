export const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_URI ? `${import.meta.env.VITE_BACKEND_URI}:3137` : "http://192.168.5.199:3137";
export const BACKEND_GRAPHQL_ENDPOINT = `${BACKEND_ENDPOINT}/graphql`;
export const IS_DEV = true;