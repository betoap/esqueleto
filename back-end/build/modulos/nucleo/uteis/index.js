#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy = {};
exports.Proxy.create = function (scope, method) {
    var aArgs = Array.prototype.slice.call(arguments, 2);
    return function () {
        return method.apply(scope, Array.prototype.slice.call(arguments, 0).concat(aArgs));
    };
};
