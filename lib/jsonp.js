"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultJsonpOptions = {
    url: '',
    timeout: 5000,
    jsonpCallback: 'callback'
};
const generateCallbackFunction = () => {
    return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
};
const clearFunction = (functionName) => {
    try {
        delete window[functionName];
    }
    catch (e) {
        window[functionName] = undefined;
    }
};
const insertScript = (script) => {
    var _a;
    (_a = document.getElementsByTagName('head')[0]) === null || _a === void 0 ? void 0 : _a.appendChild(script);
};
const removeScript = (scriptId) => {
    var _a;
    const script = document.getElementById(scriptId);
    if (script) {
        (_a = document.getElementsByTagName('head')[0]) === null || _a === void 0 ? void 0 : _a.removeChild(script);
    }
};
const jsonp = (options) => {
    const _options = Object.assign({}, defaultJsonpOptions, options);
    const { url: urlOption, timeout, jsonpCallback, jsonpCallbackFunction, charset } = _options;
    let timeoutId;
    return new Promise((resolve, reject) => {
        const callbackFunction = jsonpCallbackFunction || generateCallbackFunction();
        const scriptId = `${jsonpCallback}_${callbackFunction}`;
        // 注册 jsonp callback
        window[callbackFunction] = (response) => {
            resolve({
                ok: true,
                // keep consistent with fetch API
                json: () => Promise.resolve(response)
            });
            window.clearTimeout(timeoutId);
            clearFunction(callbackFunction);
            removeScript(scriptId);
        };
        // 创建 jsonp 发送脚本
        const jsonpScript = document.createElement('script');
        jsonpScript.id = scriptId;
        const url = urlOption + (urlOption.indexOf('?') === -1 ? '?' : '&');
        jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
        if (charset) {
            jsonpScript.setAttribute('charset', charset);
        }
        // 发送 jsonp
        insertScript(jsonpScript);
        // 超时取消
        timeoutId = window.setTimeout(() => {
            reject(new Error(`JSONP request to ${urlOption} timed out`));
            clearFunction(callbackFunction);
            removeScript(scriptId);
            // 超时后响应处理：清理自己
            window[callbackFunction] = () => clearFunction(callbackFunction);
        }, timeout);
        // Caught if got 404/500
        jsonpScript.onerror = () => {
            reject(new Error(`JSONP request to ${urlOption} failed`));
            window.clearTimeout(timeoutId);
            clearFunction(callbackFunction);
            removeScript(scriptId);
        };
    });
};
exports.default = jsonp;
