import { HiRequestOptions } from './type';
declare const upload: (options: HiRequestOptions) => import("axios").AxiosPromise<any>;
export declare type uploadType = typeof upload;
export declare type uploadReturnType = ReturnType<uploadType>;
export default upload;
