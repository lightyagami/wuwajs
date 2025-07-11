"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionRequestProxy = exports.FunctionRequestWithPriority = undefined;
const Time_1 = require("../../../../../../Core/Common/Time");
class FunctionRequestWithPriority {
  constructor() {
    this.ModuleName = "";
    this.Priority = undefined;
  }
  CompareRequest(t) {
    return this.Priority > t.Priority;
  }
}
exports.FunctionRequestWithPriority = FunctionRequestWithPriority;
class FunctionRequestProxy {
  constructor() {
    this.RequestLastTime = 0;
    this.PreFunctionRequestCache = undefined;
  }
  DecideCall(t) {
    return (this.RequestLastTime !== Time_1.Time.Frame || !this.PreFunctionRequestCache?.CompareRequest(t)) && !(this.PreFunctionRequestCache = t, this.RequestLastTime = Time_1.Time.Frame, 0);
  }
}
exports.FunctionRequestProxy = FunctionRequestProxy;
//# sourceMappingURL=FunctionRequestProxy.js.map