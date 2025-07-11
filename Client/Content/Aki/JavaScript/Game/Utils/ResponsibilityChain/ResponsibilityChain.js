"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractHandler = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ENABLE_RESPONSIBILITY_CHAIN_LOG = true;
class AbstractHandler {
  constructor() {
    this.LN1 = undefined;
  }
  SetNext(t) {
    return this.LN1 = t;
  }
  Handle(t) {
    if (this.CanHandle(t)) {
      if (ENABLE_RESPONSIBILITY_CHAIN_LOG && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ResponsibilityChain", 72, "AbstractHandler ExecuteProcessing", ["Current Handler:", this.constructor.name], ["NextHandler:", this.LN1?.constructor.name]);
      }
      this.ExecuteProcessing(t);
      return true;
    } else {
      return this.LN1?.Handle(t) ?? false;
    }
  }
  Stop(t) {
    if (this.ShouldStop(t)) {
      if (ENABLE_RESPONSIBILITY_CHAIN_LOG && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ResponsibilityChain", 72, "AbstractHandler ExecuteStopping", ["Current Handler:", this.constructor.name], ["NextHandler:", this.LN1?.constructor.name]);
      }
      this.ExecuteStopping(t);
      return true;
    } else {
      return this.LN1?.Stop(t) ?? false;
    }
  }
}
exports.AbstractHandler = AbstractHandler;
//# sourceMappingURL=ResponsibilityChain.js.map