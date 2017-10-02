#!/usr/bin/env node
export var Proxy:any = {};
Proxy.create = function ( scope:any, method:Function ): Function
{
    var aArgs:Array<any> = Array.prototype.slice.call(arguments, 2);
    return function () {
        return method.apply(scope, Array.prototype.slice.call(arguments, 0).concat(aArgs));
    };
};
