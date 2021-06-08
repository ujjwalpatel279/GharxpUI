import { getToken } from './authentication';
import { ServiceHandlingInterface } from '../types/service-handling';

export const api = {
  get: async <TData>(url: RequestInfo): Promise<ServiceHandlingInterface<TData>> => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${await getToken()}`,
      },
    });
    const hasData = response.ok;
    const result: ServiceHandlingInterface<TData> = {
      data: hasData ? await response?.json() : undefined,
      error: !hasData,
      loading: false,
    };
    return result;
  },
  post: async <TData>(url: RequestInfo, data: string): Promise<ServiceHandlingInterface<TData>> => {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        authorization: `Bearer ${await getToken()}`,
      },
      mode: 'cors',
      body: data,
    });
    const hasData = response.ok;
    const result: ServiceHandlingInterface<TData> = {
      data: hasData ? await response?.json() : undefined,
      error: !hasData,
      loading: false,
    };
    return result;
  },
  getAsBlob: async (url: RequestInfo): Promise<Blob> => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/octet-stream',
        authorization: `Bearer ${await getToken()}`,
        responseType: 'arraybuffer',
        dataType: 'blob',
      },
    });
    if (!response.ok) {
      return undefined;
    }
    return response.blob();
  },
  delete: async (url: RequestInfo): Promise<boolean> => {
    const response = await fetch(url, {
      method: 'delete',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        authorization: `Bearer ${await getToken()}`,
      },
      mode: 'cors',
    });
    return response.ok;
  },
};
