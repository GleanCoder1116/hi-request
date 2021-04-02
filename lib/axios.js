"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios = void 0;
const axios_1 = require("axios");
exports.axios = axios_1.default;
const callBackInter = new Map();
const _axiosInstance = axios_1.default.create({
    baseURL: ''
});
_axiosInstance.interceptors.request.use((config) => {
    if (callBackInter.has('beforeRequest')) {
        return callBackInter.get('beforeRequest')(config);
    }
    return config;
}, (error) => {
    callBackInter.has('errorCallback') && callBackInter.get('errorCallback')(error);
    if (callBackInter.has('errorRequest')) {
        return callBackInter.get('errorRequest')(error);
    }
    return Promise.reject(error);
});
_axiosInstance.interceptors.response.use((response) => {
    if (callBackInter.has('beforeResponse')) {
        return callBackInter.get('beforeResponse')(response);
    }
    return response;
}, (error) => {
    callBackInter.has('errorCallback') && callBackInter.get('errorCallback')(error);
    if (callBackInter.has('errorResponse')) {
        return callBackInter.get('errorResponse')(error);
    }
    return Promise.reject(error);
});
const axiosInstance = (options) => {
    const { beforeResponse, errorResponse, beforeRequest, errorRequest, errorCallback } = options;
    beforeRequest && callBackInter.set('beforeRequest', beforeRequest);
    errorResponse && callBackInter.set('errorResponse', errorResponse);
    beforeResponse && callBackInter.set('beforeResponse', beforeResponse);
    errorRequest && callBackInter.set('errorRequest', errorRequest);
    errorCallback && callBackInter.set('errorCallback', errorCallback);
    return _axiosInstance(options);
};
exports.default = axiosInstance;
