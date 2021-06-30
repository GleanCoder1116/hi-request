import type { AxiosRequestConfig, AxiosResponse, CancelStatic, CancelTokenStatic, AxiosPromise, AxiosError } from 'axios';
export interface HiRequestCallbackHooks {
    beforeResponse?: <T = any>(error: AxiosResponse<T>) => any;
    errorResponse?: (error: AxiosError) => any;
    beforeRequest?: (config: AxiosRequestConfig) => any;
    errorRequest?: (error: AxiosError) => any;
    errorCallback?: (error: AxiosError) => void;
}
export declare type HiRequestConfig = HiRequestCallbackHooks & AxiosRequestConfig;
export declare type HiRequestMethod = 'get' | 'post' | 'delete' | 'put' | 'patch' | 'head' | 'options';
export type { AxiosResponse };
export declare type HiRequestStaticAxios = 'CancelToken' | 'Cancel' | 'isCancel' | 'all' | 'spread';
export declare type HiRequestType = 'basics' | 'jsonp' | 'download' | 'upload';
export declare type HiBaseOptions = HiRequestConfig & {
    type?: HiRequestType;
};
declare type HiDownloadOptions = {
    filename?: string;
    downloadSuccess?: <T>(response: AxiosResponse<T>) => void;
    downloadFail?: <T>(response: AxiosResponse<T>) => void;
};
declare type HiJsonpOptions = {
    timeout?: number;
    charset?: string;
    jsonpCallback?: string;
    jsonpCallbackFunction?: string;
};
declare type HiUploadOptions = {
    name?: string;
    file?: string | Blob;
};
export declare type HiRequestOptions = HiBaseOptions & HiDownloadOptions & HiJsonpOptions & HiUploadOptions;
export interface HiRequestBaseInstance {
    <T = any>(options: HiRequestOptions): AxiosPromise<T>;
    <T = any>(url: string, options?: HiRequestOptions): AxiosPromise<T>;
}
export interface HiRequestInstanceWithMethod extends HiRequestBaseInstance {
    get<T = any, R = AxiosResponse<T>>(url: string, options?: HiRequestOptions): Promise<R>;
    delete<T = any, R = AxiosResponse<T>>(url: string, options?: HiRequestOptions): Promise<R>;
    head<T = any, R = AxiosResponse<T>>(url: string, options?: HiRequestOptions): Promise<R>;
    options<T = any, R = AxiosResponse<T>>(url: string, options?: HiRequestOptions): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, options?: HiRequestOptions): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, options?: HiRequestOptions): Promise<R>;
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, options?: HiRequestOptions): Promise<R>;
}
export interface HiRequestBaseStatic extends HiRequestInstanceWithMethod {
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    isCancel(value: any): boolean;
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}
export interface HiRequestJsonpInstance {
    <T = any>(options: HiRequestOptions): Promise<T>;
    <T = any>(url: string, options?: HiRequestOptions): Promise<T>;
}
export interface HiRequestUploadInstance {
    <T = any>(options: HiRequestOptions): Promise<T>;
    <T = any>(url: string, options?: HiRequestOptions): Promise<T>;
}
export interface HiRequestDownloadInstance {
    <T = any>(options: HiRequestOptions): Promise<T>;
    <T = any>(url: string, options?: HiRequestOptions): Promise<T>;
}
export interface HiRequestStatic extends HiRequestBaseStatic {
    jsonp?: HiRequestJsonpInstance;
    upload?: HiRequestUploadInstance;
    download?: HiRequestDownloadInstance;
}
