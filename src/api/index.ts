import axios, { AxiosInstance } from "axios";

class Api {
  private _axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV
      ? "http://localhost:8080"
      : "https://skipliassigment-vuongpsht.onrender.com/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  get axiosInstance(): AxiosInstance {
    return this._axiosInstance;
  }

  set axiosInstance(value: AxiosInstance) {
    this._axiosInstance = value;
  }

  POST(path: string, params: any) {
    return this.axiosInstance.post(path, { ...params });
  }
}

export const api = new Api();
