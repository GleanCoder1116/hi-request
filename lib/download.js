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
const download = (options) => {
    const { filename, downloadSuccess, downloadFail } = options, restOptions = __rest(options
    // 设置类型，防止出现乱码
    , ["filename", "downloadSuccess", "downloadFail"]);
    // 设置类型，防止出现乱码
    Object.assign(restOptions, { responseType: 'blob' });
    return axios_1.default(restOptions).then((res) => {
        // 获取下载后文件名
        const downloadFilename = filename || getDownloadFilename(res);
        // 创建下载的链接
        const blob = new window.Blob([res.data]);
        const href = window.URL.createObjectURL(blob);
        // 使用 a 标签创建下载
        const downloadElement = document.createElement('a');
        downloadElement.download = downloadFilename;
        downloadElement.href = href;
        downloadElement.style.display = 'none';
        // 开始链接下载
        document.body.appendChild(downloadElement);
        downloadElement.click();
        // 资源释放：DOM 元素 和 blob 对象
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
        // 成功下载 hook
        downloadSuccess === null || downloadSuccess === void 0 ? void 0 : downloadSuccess(res);
        return res;
    }, (error) => {
        // 失败下载 hook
        downloadFail === null || downloadFail === void 0 ? void 0 : downloadFail(error);
    });
};
// 如果没有自定义文件名，则根据响应头部信息生成
function getDownloadFilename(response) {
    var _a, _b;
    const contentDisposition = (_a = response === null || response === void 0 ? void 0 : response.headers) === null || _a === void 0 ? void 0 : _a['content-disposition'];
    const serverFilename = decodeURI(((_b = contentDisposition === null || contentDisposition === void 0 ? void 0 : contentDisposition.split(';')[1]) === null || _b === void 0 ? void 0 : _b.split('filename=')[1]) || '未命名');
    return serverFilename;
}
exports.default = download;
