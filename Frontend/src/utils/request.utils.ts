import { API_RESPONSE } from "../pages/LoginPage/const";

export const httpRequest = async <T>(url: string, options: RequestInit): Promise<API_RESPONSE> => {
  const response = await fetch(url, options).catch(err => {
    throw err;
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as API_RESPONSE;
}