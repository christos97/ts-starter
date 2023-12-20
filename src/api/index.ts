import axios, { AxiosError, AxiosHeaders } from 'axios';

import env from '@/env';
import logger from '@/logger';

logger.setContext('API');

axios.defaults.headers.common['Content-Type'] = 'application/json';

type ApiResponse<T = Record<string, any>> = Promise<[T | null, AxiosError | null]>;
/**
 * - Assuming custom headers are comma-separated "key:value" pairs in API_CUSTOM_HEADERS env variable
 * @example "X-Custom-Header:Value, X-Another-Header:AnotherValue"
 */
const getCustomHeaders = (): AxiosHeaders => {
  const headers = new AxiosHeaders();
  if (env.API_CUSTOM_HEADERS) {
    env.API_CUSTOM_HEADERS.split(',').forEach((headerPair) => {
      const [name, value] = headerPair.split(':').map((s) => s.trim());
      if (name && value) {
        headers.set(name, value);
      }
    });
  }
  return headers;
};

const handleApiError = (error: unknown): AxiosError<unknown, any> => {
  if (!axios.isAxiosError(error)) {
    logger.error('UNKNOWN_ERROR:', String(error));
    return new AxiosError(String(error), 'UNKNOWN_ERROR');
  }

  const axiosError = error as AxiosError;
  const { config, code, message, name, response, request } = axiosError;

  const errorDetails = {
    message,
    code,
    name,
    baseURL: config?.baseURL || 'N/A',
    path: config?.url || 'N/A',
    method: config?.method || 'N/A',
    status: response?.status || 'N/A',
    statusText: response?.statusText || 'N/A',
    requestBody: config?.data || 'N/A',
    requestParams: config?.params || 'N/A',
    requestHeaders: config?.headers || 'N/A',
    responseData: response?.data || 'N/A',
  };

  logger.error('ApiModuleError', JSON.stringify(errorDetails, null, 2));

  return new AxiosError(message, code, config, request, response);
};

const instance = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    ...getCustomHeaders(),
  },
  timeout: 8500,
});

const api = {
  get: async <T>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): ApiResponse<T> => {
    try {
      const response = await instance.get<T>(url, { params });
      return [response.data, null];
    } catch (error) {
      return [null, handleApiError(error)];
    }
  },
  post: async <T, U>(url: string, data: U): ApiResponse<T> => {
    try {
      const response = await instance.post<T>(url, data);
      return [response.data, null];
    } catch (error) {
      return [null, handleApiError(error)];
    }
  },
  put: async <T, U>(url: string, data: U): ApiResponse<T> => {
    try {
      const response = await instance.put<T>(url, data);
      return [response.data, null];
    } catch (error) {
      return [null, handleApiError(error)];
    }
  },
  delete: async <T>(url: string): ApiResponse<T> => {
    try {
      const response = await instance.delete<T>(url);
      return [response.data, null];
    } catch (error) {
      return [null, handleApiError(error)];
    }
  },
} as const;
type api = typeof api;

export default api;
export type { api as Api };
