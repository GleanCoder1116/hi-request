"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHTTPLink = void 0;
const isHTTPLink = (url) => {
    return /^https?:\/\//.test(url);
};
exports.isHTTPLink = isHTTPLink;
