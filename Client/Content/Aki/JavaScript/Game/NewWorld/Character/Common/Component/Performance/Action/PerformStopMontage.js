"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformStopMontage = undefined;
const PerformActionBase_1 = require("./PerformActionBase");
class PerformStopMontage extends PerformActionBase_1.PerformActionBase {
  OnExecute() {
    var e = this.PerformComp.Entity.GetComponent(45);
    if (e) {
      e.MontageManager.StopMontage(this.Param);
    }
    this.FinishExecute();
  }
}
exports.PerformStopMontage = PerformStopMontage;
//# sourceMappingURL=PerformStopMontage.js.map