export const API_URL: string | undefined = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

class Api {
  async request(path: string, options: RequestInit = {}): Promise<any> {
    const headers = new Headers();
    headers.append("Accept", "application/json");

    if (options.body instanceof FormData === false) {
      headers.append("Content-Type", "application/json");
    } else {
      headers.append("Content-Type", "multipart/form-data");
    }

    const requestOptions: RequestInit = {
      mode: "cors",
      headers,
      ...options,
    };

    try {
      const url = `${API_URL}${path}`;
      const response: Response = await fetch(url, requestOptions);
      const res = await response.json();

      if (!response.ok) {
        return Promise.reject(res);
      }

      return res;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  get(path: string): Promise<any> {
    return this.request(path);
  }

  put(path: string, body: any): Promise<any> {
    return this.request(path, { method: "PUT", body: JSON.stringify(body) });
  }

  remove(path: string, body: any): Promise<any> {
    return this.request(path, { method: "DELETE", body: JSON.stringify(body) });
  }

  post(path: string, body: any): Promise<any> {
    return this.request(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  patch(path: string, body: any): Promise<any> {
    return this.request(path, { method: "PATCH", body: JSON.stringify(body) });
  }
}

const API = new Api();
export default API;
