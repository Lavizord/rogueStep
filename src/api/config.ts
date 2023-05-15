import axios from "axios";
import applyConverters from "axios-case-converter";
import { stringify } from "qs";

const baseURL = "http://25.94.99.36:5005";

const axiosInstance = applyConverters(
  axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      accept: "*/*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/json",
    },
    paramsSerializer: (params: any) =>
      stringify(params, {
        arrayFormat: "repeat",
      }),
  })
);

export default axiosInstance;
