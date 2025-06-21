"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AbstractHandler = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ENABLE_RESPONSIBILITY_CHAIN_LOG = !0;
class AbstractHandler {
  constructor() {
    this.zF1 = void 0
  }
  SetNext(t) {
    return this.zF1 = t
  }
  Handle(t) {
    return this.CanHandle(t) ? (ENABLE_RESPONSIBILITY_CHAIN_LOG && Log_1.Log.CheckInfo() && Log_1.Log.Info("ResponsibilityChain", 72, "AbstractHandler ExecuteProcessing", ["Current Handler:", this.constructor.name], ["NextHandler:", this.zF1?.constructor.name]), this.ExecuteProcessing(t), !0) : this.zF1?.Handle(t) ?? !1
  }
  Stop(t) {
    return this.ShouldStop(t) ? (ENABLE_RESPONSIBILITY_CHAIN_LOG && Log_1.Log.CheckInfo() && Log_1.Log.Info("ResponsibilityChain", 72, "AbstractHandler ExecuteStopping", ["Current Handler:", this.constructor.name], ["NextHandler:", this.zF1?.constructor.name]), this.ExecuteStopping(t), !0) : this.zF1?.Stop(t) ?? !1
  }
}
exports.AbstractHandler = AbstractHandler;
//# sourceMappingURL=ResponsibilityChain.js.map