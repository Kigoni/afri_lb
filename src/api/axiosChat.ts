import axiosClient from "axios";
import type { AxiosRequestConfig } from "axios";

/**
 * Creates an initial 'axios' instance with custom settings.
 */
const instance = axiosClient.create({
  baseURL: "https://openrouter.ai/api/v1/chat",
  headers: {
    Accept: "application/json",
    "HTTP-Referer": "http://localhost:5173",
    Authorization: `Bearer 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`,
  },
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.request) {
      return Promise.reject(err.request);
    }
    return Promise.reject(err.message);
  }
);

/**
 * Replaces main `axios` instance with the custom one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
const axiosChat = <T>(cfg: AxiosRequestConfig) => {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer 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`;
  return instance.request<unknown, T>(cfg);
};

export default axiosChat; // Export the axiosPrivate function as the default export
