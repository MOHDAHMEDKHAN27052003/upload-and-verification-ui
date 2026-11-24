import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: true, // sends the httpOnly cookies (access + refresh)
});

// Track in-flight refresh so concurrent 401s don't trigger multiple refresh calls
let refreshPromise: Promise<void> | null = null;

const refreshTokens = async (): Promise<void> => {
  // Use a bare axios call to avoid recursive interceptor loops
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  );
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt refresh on 401, and only once per request
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Deduplicate concurrent refresh attempts
        if (!refreshPromise) {
          refreshPromise = refreshTokens().finally(() => {
            refreshPromise = null;
          });
        }
        await refreshPromise;

        // Cookies are set by the server; retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed — redirect to login (adjust for your router)
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/send-otp';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);