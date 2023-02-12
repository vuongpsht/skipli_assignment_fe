import axios, { AxiosInstance } from "axios";
import * as queryString from "querystring";

class GithubApi {
  private _axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/api.github.com",
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
  GET(path: string, params: any) {
    return this.axiosInstance.get(
      `${path}${params ? "?" + queryString.encode(params) : ""}`
    );
  }
}

export const github = new GithubApi();
