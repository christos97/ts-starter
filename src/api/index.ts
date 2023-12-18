import axios, { AxiosError } from 'axios';

import env from '@/env';

axios.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * - Assuming custom headers are comma-separated "key:value" pairs in API_CUSTOM_HEADERS env variable
 * @example "X-Custom-Header:Value, X-Another-Header:AnotherValue"
 */
const getCustomHeaders = (): Record<string, string> => {
  const headers = {} as Record<string, string>;
  if (env.API_CUSTOM_HEADERS) {
    env.API_CUSTOM_HEADERS.split(',').forEach((headerPair) => {
      const [key, value] = headerPair.split(':').map((s) => s.trim());
      if (key && value) {
        headers[key] = value;
      }
    });
  }

  return headers;
};

const handleApiError = (error: unknown): AxiosError<unknown, any> => {
  if (!axios.isAxiosError(error)) {
    console.error('UNKNOWN_ERROR:', error);
    return new AxiosError(String(error), 'UNKNOWN_ERROR');
  }

  const axiosError = error as AxiosError;
  const errorDetails = {
    message: axiosError.message,
    url: axiosError?.config?.url,
    method: axiosError?.config?.method,
    status: axiosError.response?.status,
    statusText: axiosError.response?.statusText,
    requestBody: axiosError.config?.data || 'N/A',
    requestParams: axiosError.config?.params || 'N/A',
    requestHeaders: axiosError.config?.headers,
    responseData: axiosError.response?.data,
  };

  console.error('API Error:', JSON.stringify(errorDetails, null, 2));

  return axiosError;
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
    params?: Record<string, any>,
  ): Promise<[T | null, AxiosError | null]> => {
    try {
      console.log({ params });
      const response = await instance.get<T>(url, { params });
      return [response.data, null];
    } catch (error) {
      return [null, handleApiError(error)];
    }
  },
  post: async <T, U>(url: string, data: U): Promise<[T | null, AxiosError | null]> => {
    try {
      const response = await instance.post<T>(url, data);
      return [response.data, null];
    } catch (error) {
      return [null, handleApiError(error)];
    }
  },
  put: async <T, U>(url: string, data: U): Promise<[T | null, AxiosError | null]> => {
    try {
      const response = await instance.put<T>(url, data);
      return [response.data, null];
    } catch (error) {
      return [null, handleApiError(error)];
    }
  },
  delete: async <T>(url: string): Promise<[T | null, AxiosError | null]> => {
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
