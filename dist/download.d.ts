import { AxiosResponse, HiRequestOptions } from './type';
declare const download: (options: HiRequestOptions) => Promise<void | AxiosResponse<any>>;
export declare type downloadType = typeof download;
export declare type downloadReturnType = ReturnType<downloadType>;
export default download;
