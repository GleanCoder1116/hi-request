(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HiRequest"] = factory();
	else
		root["HiRequest"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 28:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var defaultJsonpOptions = {
    url: '',
    timeout: 5000,
    jsonpCallback: 'callback'
};
var generateCallbackFunction = function () {
    return "jsonp_" + Date.now() + "_" + Math.ceil(Math.random() * 100000);
};
var clearFunction = function (functionName) {
    try {
        delete window[functionName];
    }
    catch (e) {
        window[functionName] = undefined;
    }
};
var insertScript = function (script) {
    var _a;
    (_a = document.getElementsByTagName('head')[0]) === null || _a === void 0 ? void 0 : _a.appendChild(script);
};
var removeScript = function (scriptId) {
    var _a;
    var script = document.getElementById(scriptId);
    if (script) {
        (_a = document.getElementsByTagName('head')[0]) === null || _a === void 0 ? void 0 : _a.removeChild(script);
    }
};
var jsonp = function (options) {
    var _options = Object.assign({}, defaultJsonpOptions, options);
    var urlOption = _options.url, timeout = _options.timeout, jsonpCallback = _options.jsonpCallback, jsonpCallbackFunction = _options.jsonpCallbackFunction, charset = _options.charset;
    var timeoutId;
    return new Promise(function (resolve, reject) {
        var callbackFunction = jsonpCallbackFunction || generateCallbackFunction();
        var scriptId = jsonpCallback + "_" + callbackFunction;
        window[callbackFunction] = function (response) {
            resolve({
                ok: true,
                json: function () { return Promise.resolve(response); }
            });
            window.clearTimeout(timeoutId);
            clearFunction(callbackFunction);
            removeScript(scriptId);
        };
        var jsonpScript = document.createElement('script');
        jsonpScript.id = scriptId;
        var url = urlOption + (urlOption.indexOf('?') === -1 ? '?' : '&');
        jsonpScript.setAttribute('src', "" + url + jsonpCallback + "=" + callbackFunction);
        if (charset) {
            jsonpScript.setAttribute('charset', charset);
        }
        insertScript(jsonpScript);
        timeoutId = window.setTimeout(function () {
            reject(new Error("JSONP request to " + urlOption + " timed out"));
            clearFunction(callbackFunction);
            removeScript(scriptId);
            window[callbackFunction] = function () { return clearFunction(callbackFunction); };
        }, timeout);
        jsonpScript.onerror = function () {
            reject(new Error("JSONP request to " + urlOption + " failed"));
            window.clearTimeout(timeoutId);
            clearFunction(callbackFunction);
            removeScript(scriptId);
        };
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jsonp);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(28);
/******/ })()
.default;
});