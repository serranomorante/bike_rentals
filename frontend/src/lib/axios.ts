import baseAxios, { AxiosRequestConfig } from "axios";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.BACKEND_API_URL,
};

const axios = baseAxios.create(axiosRequestConfig);

export default axios;
