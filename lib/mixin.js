"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("./axios");
const jsonp_1 = require("./jsonp");
const download_1 = require("./download");
const upload_1 = require("./upload");
const utils_1 = require("./utils");
// Mixed Request
const InternalRequest = (type, url, options) => {
    const baseOptions = typeof url === 'string' ? { url } : url;
    const { url: urlOption, type: typeOption, baseURL, responseType = 'json' } = Object.assign({}, baseOptions, options);
    const _url = utils_1.isHTTPLink(urlOption) ? urlOption : (baseURL ? baseURL + urlOption : urlOption);
    const _type = type || typeOption;
    const _options = Object.assign({}, options, { url: _url, responseType });
    switch (_type) {
        case 'jsonp':
            return jsonp_1.default(_options);
        case 'download':
            return download_1.default(_options);
        case 'upload':
            return upload_1.default(_options);
        default:
            return axios_1.default(_options);
    }
};
// @ts-ignore
const HiRequest = (url, options) => InternalRequest(null, url, options);
// 请求语法糖： HiRequest.get HiRequest.post ……
const AXIOS_METHODS = [
    'get',
    'post',
    'delete',
    'put',
    'patch',
    'head',
    'options'
];
AXIOS_METHODS.forEach((method) => {
    // @ts-ignore
    HiRequest[method] = (url, options) => HiRequest(Object.assign(Object.assign({}, options), { method, url }));
});
// 扩展的 axios 静态方法：cancels、all\spread
const AXIOS_REST_STATIC = [
    'CancelToken',
    'Cancel',
    'isCancel',
    'all',
    'spread'
];
AXIOS_REST_STATIC.forEach((type) => {
    // @ts-ignore
    HiRequest[type] = axios_1.axios[type];
});
// jsonp
HiRequest.jsonp = (url, options) => InternalRequest('jsonp', url, options);
// download
HiRequest.download = (url, options) => InternalRequest('download', url, options);
// upload
HiRequest.upload = (url, options) => InternalRequest('upload', url, options);
exports.default = HiRequest;
