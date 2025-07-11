"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionBase = undefined;
class GuaranteeActionBase {
  constructor() {
    this.Type = "EnablePlayerMoveControl";
    this.ActionInfo = undefined;
    this.Context = undefined;
  }
  Execute(e, t) {
    this.ActionInfo = e;
    this.Context = t;
    this.OnExecute(e.Params);
  }
  OnExecute(e) {}
}
exports.GuaranteeActionBase = GuaranteeActionBase;
//# sourceMappingURL=GuaranteeActionBase.js.map