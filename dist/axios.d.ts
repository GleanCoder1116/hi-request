import axios from 'axios';
import type { HiRequestConfig } from './type';
declare const axiosInstance: (options: HiRequestConfig) => import("axios").AxiosPromise<any>;
export { axios };
export default axiosInstance;
