"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("./axios");
const upload = (options) => {
    const { headers: headersOption, data: dataOption } = options, restOptions = __rest(options, ["headers", "data"]);
    const data = dataOption || getFormFile(options);
    const headers = Object.assign(Object.assign({}, headersOption), { 'Content-Type': 'multipart/form-data' });
    return axios_1.default(Object.assign(Object.assign({}, restOptions), { method: 'post', data,
        headers }));
};
function getFormFile(options) {
    const { file, name = 'file', params = {} } = options;
    const formFile = new window.FormData();
    if (file) {
        formFile.append(name, file);
    }
    // 设置除 file 外需要带入的参数
    if (params) {
        Object.keys(params).forEach((key) => {
            formFile.append(key, params[key]);
        });
    }
    return formFile;
}
exports.default = upload;
