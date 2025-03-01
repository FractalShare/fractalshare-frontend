import { getToken } from "@/lib/auth";

export default class ApiProxy {
  static async getHeaders(requireAuth: boolean) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    const authToken = getToken();
    if (authToken && requireAuth) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
  }

  static async handleFetch(endpoint: string, requestOptions: RequestInit) {
    let data = {};
    let status = 500;

    try {
      const response = await fetch(endpoint, requestOptions);
      data = await response.json();
      status = response.status;
    } catch (error) {
      data = { message: "Cannot reach API server", error: error };
      status = 500;
    }

    return { data, status };
  }

  static async put(endpoint: string, object: Record<string, string>, requireAuth: boolean) {
    const jsonData = JSON.stringify(object);
    const headers = await ApiProxy.getHeaders(requireAuth);

    const requestOptions: RequestInit = {
      method: "PUT",
      headers,
      body: jsonData,
    };

    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  static async delete(endpoint: string, requireAuth: boolean) {
    const headers = await ApiProxy.getHeaders(requireAuth);

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers,
    };

    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  static async post(endpoint: string, object: Record<string, unknown>, requireAuth: boolean) {
    const jsonData = JSON.stringify(object);
    const headers = await ApiProxy.getHeaders(requireAuth);

    const requestOptions: RequestInit = {
      method: "POST",
      headers,
      body: jsonData,
    };

    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  static async get(endpoint: string, requireAuth: boolean) {
    const headers = await ApiProxy.getHeaders(requireAuth);

    const requestOptions: RequestInit = {
      method: "GET",
      headers,
    };

    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }
}
