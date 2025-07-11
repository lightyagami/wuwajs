"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = exports.isSymbol = exports.isString = exports.isPromise = exports.isObject = exports.isNumber = exports.isFunction = exports.isError = exports.isDate = exports.isBoolean = exports.isAsyncFunction = exports.isArray = undefined;
const checkType = s => e => Object.prototype.toString.call(e).slice(8, -1).toLowerCase() === s.toLowerCase();
const isNumber = checkType("Number");
exports.isNumber = isNumber;
const isArray = checkType("Array");
exports.isArray = isArray;
const isBoolean = checkType("Boolean");
exports.isBoolean = isBoolean;
const isAsyncFunction = checkType("AsyncFunction");
exports.isAsyncFunction = isAsyncFunction;
const isPromise = checkType("Promise");
exports.isPromise = isPromise;
const isObject = checkType("Object");
exports.isObject = isObject;
const isUndefined = checkType("Undefined");
exports.isUndefined = isUndefined;
const isString = checkType("String");
exports.isString = isString;
const isSymbol = checkType("Symbol");
exports.isSymbol = isSymbol;
const isDate = checkType("Date");
exports.isDate = isDate;
const isError = checkType("Error");
exports.isError = isError;
const isFunction = e => typeof e == "function";
exports.isFunction = isFunction;
//# sourceMappingURL=TypeCheckUtil.js.map