import { HiRequestOptions } from './type';
declare const jsonp: (options: HiRequestOptions) => Promise<unknown>;
export declare type jsonpType = typeof jsonp;
export declare type jsonpReturnType = ReturnType<jsonpType>;
export default jsonp;
