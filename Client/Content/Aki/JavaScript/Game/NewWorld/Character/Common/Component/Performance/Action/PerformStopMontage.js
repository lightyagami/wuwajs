"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PerformStopMontage = void 0;
const PerformActionBase_1 = require("./PerformActionBase");
class PerformStopMontage extends PerformActionBase_1.PerformActionBase {
  OnExecute() {
    var e = this.PerformComp.Entity.GetComponent(44);
    e && e.MontageManager.StopMontage(this.Param), this.FinishExecute()
  }
}
exports.PerformStopMontage = PerformStopMontage;
//# sourceMappingURL=PerformStopMontage.js.map